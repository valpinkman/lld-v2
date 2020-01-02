// @flow
import React from "react";
import styled from "styled-components";
import type { Baker } from "@ledgerhq/live-common/lib/families/tezos/bakers";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";
import Box from "~/renderer/components/Box";
import CustomValidator from "~/renderer/icons/CustomValidator";

const Circle: ThemedComponent<{ size: number }> = styled(Box).attrs(props => ({
  style: {
    width: props.size,
    height: props.size,
  },
}))`
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img.attrs(props => ({
  style: {
    width: props.size,
    height: props.size,
  },
}))``;

type Props = {
  size?: number,
  baker: ?Baker,
};

const BakerImage = ({ size = 24, baker }: Props) => (
  <Circle size={size}>
    {baker ? <Img src={baker.logoURL} size={size} /> : <CustomValidator size={size} />}
  </Circle>
);

export default BakerImage;
