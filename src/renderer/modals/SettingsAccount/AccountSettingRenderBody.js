// @flow

import React, { PureComponent, Fragment } from "react";
import get from "lodash/get";
import { setDataModal } from "~/renderer/actions/modals";
import { removeAccount, updateAccount } from "~/renderer/actions/accounts";
import { validateNameEdition } from "@ledgerhq/live-common/lib/account";
import { AccountNameRequiredError } from "@ledgerhq/errors";
import { MAX_ACCOUNT_NAME_SIZE } from "~/config/constants";
import styled from "styled-components";
import ModalBody from "~/renderer/components/Modal/ModalBody";
import TrackPage from "~/renderer/analytics/TrackPage";
import Box from "~/renderer/components/Box";
import Input from "~/renderer/components/Input";
import Select from "~/renderer/components/Select";
import Spoiler from "~/renderer/components/Spoiler";
import SyncAgo from "~/renderer/components/SyncAgo";
import ConfirmModal from "~/renderer/modals/ConfirmModal";
import Space from "~/renderer/components/Space";
import Button from "~/renderer/components/Button";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";
import type { Account, Unit } from "@ledgerhq/live-common/lib/types";
import type { T } from "~/types/common";

type State = {
  accountName: ?string,
  accountUnit: ?Unit,
  endpointConfig: ?string,
  accountNameError: ?Error,
  endpointConfigError: ?Error,
  isRemoveAccountModalOpen: boolean,
};

type Props = {
  setDataModal: Function,
  updateAccount: Function,
  removeAccount: Function,
  t: T,
  onClose: () => void,
  data: any,
};

const unitGetOptionValue = unit => unit.magnitude;
const renderUnitItemCode = item => item.data.code;

const mapDispatchToProps = {
  setDataModal,
  updateAccount,
  removeAccount,
};

const defaultState = {
  accountName: null,
  accountUnit: null,
  endpointConfig: null,
  accountNameError: null,
  endpointConfigError: null,
  isRemoveAccountModalOpen: false,
};

class AccountSettingRenderBody extends PureComponent<Props, State> {
  state = {
    ...defaultState,
  };

  getAccount(data: Object): Account {
    const { accountName } = this.state;
    const account = get(data, "account", {});

    return {
      ...account,
      ...(accountName !== null
        ? {
            name: accountName,
          }
        : {}),
    };
  }

  handleChangeName = (value: string) =>
    this.setState({
      accountName: value,
    });

  handleSubmit = (account: Account, onClose: () => void) => (
    e: SyntheticEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    e.preventDefault();
    const { updateAccount, setDataModal } = this.props;
    const { accountName, accountUnit, endpointConfig, endpointConfigError } = this.state;

    if (!account.name.length) {
      this.setState({ accountNameError: new AccountNameRequiredError() });
    } else if (!endpointConfigError) {
      const name = validateNameEdition(account, accountName);

      account = {
        ...account,
        unit: accountUnit || account.unit,
        name,
      };
      if (endpointConfig && !endpointConfigError) {
        account.endpointConfig = endpointConfig;
      }
      updateAccount(account);
      setDataModal("MODAL_SETTINGS_ACCOUNT", { account });
      onClose();
    }
  };

  handleFocus = (e: any, name: string) => {
    e.target.select();

    switch (name) {
      case "accountName":
        this.setState({ accountNameError: null });
        break;
      case "endpointConfig":
        this.setState({ endpointConfigError: null });
        break;
      default:
        break;
    }
  };

  handleChangeUnit = (value: Unit) => {
    this.setState({ accountUnit: value });
  };

  handleOpenRemoveAccountModal = () => this.setState({ isRemoveAccountModalOpen: true });

  handleCloseRemoveAccountModal = () => this.setState({ isRemoveAccountModalOpen: false });

  handleRemoveAccount = (account: Account) => {
    const { removeAccount, onClose } = this.props;
    removeAccount(account);
    this.setState({ isRemoveAccountModalOpen: false });
    onClose();
  };

  render() {
    const { accountUnit, accountNameError, isRemoveAccountModalOpen } = this.state;
    const { t, onClose, data } = this.props;
    if (!data) return null;

    const account = this.getAccount(data);
    const usefulData = {
      xpub: account.xpub || undefined,
      index: account.index,
      freshAddressPath: account.freshAddressPath,
      id: account.id,
      blockHeight: account.blockHeight,
    };

    const onSubmit = this.handleSubmit(account, onClose);

    return (
      <ModalBody
        onClose={onClose}
        title={t("account.settings.title")}
        render={() => (
          <Fragment>
            <TrackPage category="Modal" name="AccountSettings" />
            <Container>
              <Box>
                <OptionRowTitle>{t("account.settings.accountName.title")}</OptionRowTitle>
                <OptionRowDesc>{t("account.settings.accountName.desc")}</OptionRowDesc>
              </Box>
              <Box>
                <Input
                  autoFocus
                  containerProps={{ style: { width: 230 } }}
                  value={account.name}
                  maxLength={MAX_ACCOUNT_NAME_SIZE}
                  onChange={this.handleChangeName}
                  onEnter={onSubmit}
                  onFocus={e => this.handleFocus(e, "accountName")}
                  error={accountNameError}
                />
              </Box>
            </Container>
            <Container>
              <Box>
                <OptionRowTitle>{t("account.settings.unit.title")}</OptionRowTitle>
                <OptionRowDesc>{t("account.settings.unit.desc")}</OptionRowDesc>
              </Box>
              <Box style={{ width: 230 }}>
                <Select
                  isSearchable={false}
                  onChange={this.handleChangeUnit}
                  getOptionValue={unitGetOptionValue}
                  renderValue={renderUnitItemCode}
                  renderOption={renderUnitItemCode}
                  value={accountUnit || account.unit}
                  options={account.currency.units}
                />
              </Box>
            </Container>
            <Spoiler textTransform title={t("account.settings.advancedLogs")}>
              <SyncAgo date={account.lastSyncDate} />
              <AdvancedLogsContainer>{JSON.stringify(usefulData, null, 2)}</AdvancedLogsContainer>
            </Spoiler>
            <ConfirmModal
              analyticsName="RemoveAccount"
              isDanger
              centered
              isOpened={isRemoveAccountModalOpen}
              onClose={this.handleCloseRemoveAccountModal}
              onReject={this.handleCloseRemoveAccountModal}
              onConfirm={() => this.handleRemoveAccount(account)}
              title={t("settings.removeAccountModal.title")}
              subTitle={t("common.areYouSure")}
              desc={t("settings.removeAccountModal.desc")}
            />
            <Space of={20} />
          </Fragment>
        )}
        renderFooter={() => (
          <Fragment>
            <Button
              event="OpenAccountDelete"
              danger
              type="button"
              onClick={this.handleOpenRemoveAccountModal}
            >
              {t("common.delete")}
            </Button>
            <Button event="DoneEditingAccount" ml="auto" onClick={onSubmit} primary>
              {t("common.apply")}
            </Button>
          </Fragment>
        )}
      />
    );
  }
}

const AdvancedLogsContainer: ThemedComponent<{}> = styled.div`
  border: 1px dashed ${p => p.theme.colors.palette.background.default};
  background-color: ${p => p.theme.colors.palette.background.default};
  color: ${p => p.theme.colors.palette.text.shade100};
  font-family: monospace;
  font-size: 11px;
  outline: none;
  padding: 20px;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  user-select: auto;
`;

const ConnectedAccountSettingRenderBody: React$ComponentType<{}> = compose(
  connect(null, mapDispatchToProps),
  withTranslation(),
)(AccountSettingRenderBody);

export default ConnectedAccountSettingRenderBody;

export const Container: ThemedComponent<{}> = styled(Box).attrs(() => ({
  flow: 2,
  justify: "space-between",
  horizontal: true,
  mb: 3,
  pb: 4,
}))`
  border-bottom: 1px solid ${p => p.theme.colors.palette.divider};
`;

export const OptionRowDesc: ThemedComponent<{}> = styled(Box).attrs(() => ({
  ff: "Inter|Regular",
  fontSize: 3,
  textAlign: "left",
  lineHeight: 1.69,
  color: "palette.text.shade60",
  shrink: 1,
}))``;
export const OptionRowTitle: ThemedComponent<{}> = styled(Box).attrs(() => ({
  ff: "Inter|SemiBold",
  color: "palette.text.shade100",
  fontSize: 4,
  textAlign: "left",
  lineHeight: 1.69,
}))``;