import React from 'react';
import { View as RNView } from 'react-native';
import { spacing, SpacingType, ViewType, shadow } from '@styles';
import { useTheme } from '@hooks';

const View: React.FC<Partial<ViewType>> = ({
	children,
	ph = 0,
	pv = 0,
	pl = 0,
	pr = 0,
	pt = 0,
	pb = 0,
	p = 0,
	mh = 0,
	mv = 0,
	ml = 0,
	mr = 0,
	mt = 0,
	mb = 0,
	m = 0,
	h = 0,
	w = 0,
	s,
	br = 0,
	btlr = 0,
	btrr = 0,
	bblr = 0,
	bbrr = 0,
	bw = 0,
	flex1,
	round,
	bgc,
	bc,
	row = false,
	main,
	cross,
	style
}) => {
	const { colors } = useTheme();
	return (
		<RNView
			style={{
				...(!!ph && { paddingHorizontal: spacing[ph as SpacingType] }),
				...(!!pv && { paddingVertical: spacing[pv as SpacingType] }),
				...(!!pl && { paddingLeft: spacing[pl as SpacingType] }),
				...(!!pr && { paddingRight: spacing[pr as SpacingType] }),
				...(!!pt && { paddingTop: spacing[pt as SpacingType] }),
				...(!!pb && { paddingBottom: spacing[pb as SpacingType] }),
				...(!!p && { padding: spacing[p as SpacingType] }),
				...(!!mh && { marginHorizontal: spacing[mh as SpacingType] }),
				...(!!mv && { marginVertical: spacing[mv as SpacingType] }),
				...(!!ml && { marginLeft: spacing[ml as SpacingType] }),
				...(!!mr && { marginRight: spacing[mr as SpacingType] }),
				...(!!mt && { marginTop: spacing[mt as SpacingType] }),
				...(!!mb && { marginBottom: spacing[mb as SpacingType] }),
				...(!!m && { marginR: spacing[m as SpacingType] }),
				...(!!h && { height: h }),
				...(!!w && { width: w }),
				...(!!s && { ...shadow[s] }),
				...(!!br && { borderRadius: spacing[br as SpacingType] }),
				...(!!btlr && { borderTopLeftRadius: spacing[btlr as SpacingType] }),
				...(!!btrr && { borderTopRightRadius: spacing[btrr as SpacingType] }),
				...(!!bblr && { borderBottomLeftRadius: spacing[bblr as SpacingType] }),
				...(!!bbrr && { borderBottomRightRadius: spacing[bbrr as SpacingType] }),
				...(!!bw && { borderWidth: bw }),
				...(!!round && { height: round, width: round, borderRadius: round / 2 }),
				...(!!bgc && { backgroundColor: colors[bgc] }),
				...(!!bc && { borderColor: colors[bc] }),
				...(!!row && { flexDirection: 'row' }),
				...(!!main && { justifyContent: main }),
				...(!!cross && { alignItems: cross }),
				...(!!flex1 && { flex: 1 }),
				...(style as object)
			}}
		>
			{children}
		</RNView>
	);
};

export default View;
