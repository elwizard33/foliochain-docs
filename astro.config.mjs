import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://elwizard33.github.io',
	base: '/foliochain-docs',
	integrations: [
		starlight({
			title: 'FolioChain Protocol',
			description: 'Comprehensive documentation for the FolioChain Protocol - Costa Rica\'s premier real-world asset tokenization platform',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: {
				github: 'https://github.com/foliochain/protocol',
			},
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Executive Summary', link: '/overview/executive-summary/' },
						{ label: 'Introduction', link: '/overview/introduction/' },
						{ label: 'Protocol Objectives', link: '/overview/objectives/' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Technical Overview', link: '/architecture/overview/' },
						{ label: 'On-Chain Components', link: '/architecture/on-chain/' },
						{ label: 'Off-Chain Components', link: '/architecture/off-chain/' },
						{ label: 'Integration Layers', link: '/architecture/integration/' },
					],
				},
				{
					label: 'Implementation',
					items: [
						{ label: 'Scalability & Tech Stack', link: '/implementation/scalability/' },
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});