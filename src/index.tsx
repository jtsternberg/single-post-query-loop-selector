/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import type { BlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

import { SinglePostPicker } from './single-post-picker';
const VARIATION_NAME = 'creativeandrew/single-post-query-loop-selector';

interface BlockCoreQueryAttributes extends BlockVariation {
	allowedControls: [ 'postType' ],
}

registerBlockVariation( 'core/query', {
	name: VARIATION_NAME,
	title: __( 'Single Post Query Loop', 'single-post-query-loop-selector' ),
	description: __(
		'Allow you to search and select a single post.',
		'single-post-query-loop-selector'
	),
	category: 'theme',
	isActive: [ 'namespace' ],
	attributes: {
		namespace: VARIATION_NAME,
		query: {
			perPage: 1,
			postType: 'post',
			sticky: 'exclude',
		},
		className: 'is-style-single-post-query-loop-selector',
	},
	allowedControls: [ 'postType' ],
	innerBlocks: [
		[
			'core/post-template',
			{},
			[ [ 'core/post-title' ], [ 'core/post-excerpt' ] ],
		],
	],
	scope: [ 'inserter' ],
} as BlockCoreQueryAttributes );

const isSingePostPicker = ( props: { attributes: { namespace: string } } ) => {
	const {
		attributes: { namespace },
	} = props;
	return namespace && namespace === VARIATION_NAME;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAdvancedQueryControls = ( BlockEdit: React.FC ) => ( props: any ) => {
	if ( isSingePostPicker( props ) ) {
		const { setAttributes, attributes } = props;
		return (
			<>
				<SinglePostPicker
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<BlockEdit { ...props } />
			</>
		);
	}
	return <BlockEdit { ...props } />;
};

addFilter( 'editor.BlockEdit', 'core/query', withAdvancedQueryControls );
