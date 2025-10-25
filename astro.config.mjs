import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config  
export default defineConfig({
	site: 'https://elwizard33.github.io',
	base: import.meta.env.PROD ? '/foliochain-docs' : '/',
	markdown: {
		rehypePlugins: [
			[rehypeMermaid, { strategy: 'img-svg' }]
		],
	},
	integrations: [
		starlight({
			title: 'FolioChain Protocol',
			description: 'Comprehensive documentation for the FolioChain Protocol - Costa Rica\'s premier real-world asset tokenization platform',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				es: {
					label: 'Español',
					lang: 'es',
				},
			},
			logo: {
			src: '/src/assets/icon.png',
		},
		favicon: '/icon.png',
		social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/elwizard33/foliochain-docs',
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					translations: {
						es: 'Primeros Pasos',
					},
					items: [
						{ 
							label: 'Welcome', 
							link: '/welcome/',
							translations: {
								es: 'Bienvenida',
							},
						},
					],
				},
				{
					label: 'Overview',
					translations: {
						es: 'Descripción General',
					},
					items: [
						{ 
							label: 'Executive Summary', 
							link: '/overview/executive-summary/',
							translations: {
								es: 'Resumen Ejecutivo',
							},
						},
						{ 
							label: 'Introduction', 
							link: '/overview/introduction/',
							translations: {
								es: 'Introducción',
							},
						},
						{ 
							label: 'Protocol Objectives', 
							link: '/overview/objectives/',
							translations: {
								es: 'Objetivos del Protocolo',
							},
						},
					],
				},
				{
					label: 'Architecture',
					translations: {
						es: 'Arquitectura',
					},
					items: [
						{ 
							label: 'Technical Overview', 
							link: '/architecture/overview/',
							translations: {
								es: 'Descripción Técnica',
							},
						},
						{ 
							label: 'On-Chain Components', 
							link: '/architecture/on-chain/',
							translations: {
								es: 'Componentes On-Chain',
							},
						},
						{ 
							label: 'Off-Chain Components', 
							link: '/architecture/off-chain/',
							translations: {
								es: 'Componentes Off-Chain',
							},
						},
						{ 
							label: 'Integration Layers', 
							link: '/architecture/integration/',
							translations: {
								es: 'Capas de Integración',
							},
						},
					],
				},
				{
					label: 'Implementation',
					translations: {
						es: 'Implementación',
					},
					items: [
						{ 
							label: 'Scalability & Tech Stack', 
							link: '/implementation/scalability/',
							translations: {
								es: 'Escalabilidad y Stack Tecnológico',
							},
						},
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
		mdx(),
	],
});