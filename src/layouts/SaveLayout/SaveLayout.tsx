import React from 'react';
import { Background } from './Background/Background';
import { ContentCard } from './ContentCard/ContentCard';

const SaveLayout: React.FC = ({ children }) => (
	<Background>
		<ContentCard>
			{children}
		</ContentCard>
	</Background>
);

export default SaveLayout;
