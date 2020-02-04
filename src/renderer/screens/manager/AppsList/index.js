// @flow
import React, { memo } from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import type { TFunction } from "react-i18next";
import type { DeviceInfo } from "@ledgerhq/live-common/lib/types/manager";
import type { ListAppsResult, Exec } from "@ledgerhq/live-common/lib/apps/types";
import type { Device } from "~/renderer/reducers/devices";
import { getActionPlan, useAppsRunner, isIncompleteState } from "@ledgerhq/live-common/lib/apps";

import NavigationGuard from "~/renderer/components/NavigationGuard";
import Quit from "~/renderer/icons/Quit";

import AppList from "./AppsList";
import DeviceStorage from "../DeviceStorage/index";
import UpdateAllApps from "./UpdateAllApps";

import omit from "lodash/omit";

const QuitIconWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: ${p => p.theme.space[8]}px;
  height: ${p => p.theme.space[8]}px;
  color: ${p => p.theme.colors.palette.primary.main};
  background-color: ${p => p.theme.colors.palette.action.hover};
  border-radius: 100%;
  margin-top: -${p => p.theme.space[6]}px;
`;

type Props = {
  device: Device,
  deviceInfo: DeviceInfo,
  result: ListAppsResult,
  exec: Exec,
  t: TFunction,
};

const AppsList = ({ deviceInfo, result, exec, t }: Props) => {
  const [state, dispatch] = useAppsRunner(result, exec);
  const filteredState = omit(state, "currentProgress");
  const progress = state.currentProgress;
  const plan = getActionPlan(filteredState) || [];
  const isIncomplete = isIncompleteState(filteredState);

  const { installQueue, uninstallQueue } = filteredState;

  const installState =
    installQueue.length > 0 ? (uninstallQueue.length > 0 ? "update" : "install") : "uninstall";

  return (
    <>
      <NavigationGuard
        analyticsName="ManagerGuardModal"
        when={installQueue.length > 0 || uninstallQueue.length > 0}
        title={t(`errors.ManagerQuitPage.${installState}.title`)}
        renderIcon={() => (
          <QuitIconWrapper>
            <Quit size={30} />
          </QuitIconWrapper>
        )}
        desc={t(`errors.ManagerQuitPage.${installState}.description`)}
        confirmText={t(`errors.ManagerQuitPage.quit`)}
        cancelText={t(`errors.ManagerQuitPage.${installState}.stay`)}
      />
      <DeviceStorage state={filteredState} deviceInfo={deviceInfo} />
      <UpdateAllApps
        state={filteredState}
        dispatch={dispatch}
        isIncomplete={isIncomplete}
        plan={plan}
        progress={progress}
      />
      <AppList
        deviceInfo={deviceInfo}
        state={filteredState}
        dispatch={dispatch}
        plan={plan}
        isIncomplete={isIncomplete}
        progress={progress}
        t={t}
      />
    </>
  );
};

const AppsListScreen = memo<Props>(AppsList);

export default withTranslation()(AppsListScreen);
