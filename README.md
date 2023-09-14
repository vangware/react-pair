# This repository's code was moved to [this monorepo](https://github.com/vangware/libraries/tree/main/packages/react-pair).

<img id="logo" alt="React Pair by Vangware" src="./logo.svg" height="128" />

![Coverage][coverage-badge] ![License][license-badge]
![NPM Version][npm-version-badge] ![Open Issues][open-issues-badge]

🖇️ Util to help with the [paired hook pattern][article].

## Usage

### 📦 Node

Install `react-pair` as a dependency:

```bash
pnpm add react-pair
# or
npm install react-pair
# or
yarn add react-pair
```

Import it and use it:

```tsx
import { useState } from "react";
import { pair } from "react-pair";

const useCount = initialCount => {
	const [count, setCount] = useState(initialCount);

	return { onClick: () => setCount(count + 1), children: count };
};

const PairedCount = pair(useCount);

const Component = ({ array = [] }) => (
	<ul>
		{array.map(key => (
			<PairedCount key={key}>
				{usePairedCount => {
					const props = usePairedCount(key);

					return (
						<li>
							<button type="button" {...props} />
						</li>
					);
				}}
			</PairedCount>
		))}
	</ul>
);
```

### 🦕 Deno

Import `react-pair` using the `npm:` prefix, and use it directly:

```tsx
import { useState } from "npm:react";
import { pair } from "npm:react-pair";

const useCount = initialCount => {
	const [count, setCount] = useState(initialCount);

	return { onClick: () => setCount(count + 1), children: count };
};

const PairedCount = pair(useCount);

const Component = ({ array = [] }) => (
	<ul>
		{array.map(key => (
			<PairedCount key={key}>
				{usePairedCount => {
					const props = usePairedCount(key);

					return (
						<li>
							<button type="button" {...props} />
						</li>
					);
				}}
			</PairedCount>
		))}
	</ul>
);
```

### 🌎 Browser

Import `react-pair` using [esm.sh][esm.sh], and use it directly:

```html
<script type="module">
	import { createElement, useState } from "https://esm.sh/react";
	import { pair } from "https://esm.sh/react-pair";

	const useCount = initialCount => {
		const [count, setCount] = useState(initialCount);

		return { onClick: () => setCount(count + 1), children: count };
	};

	const PairedCount = pair(useCount);

	const Component = ({ array = [] }) => (
		<ul>
			{array.map(key =>
				createElement(PairedCount, { key }, usePairedCount => {
					const props = usePairedCount(key);

					return createElement(
						"li",
						null,
						createElement("button", props),
					);
				}),
			)}
		</ul>
	);
</script>
```

## Useful links

-   📝 [Documentation][documentation]: TypeDoc generated documentation.
-   ⏳ [Changelog][changelog]: List of changes between versions.
-   ✅ [Tests Coverage][coverage]: Coveralls page with tests coverage.

<!-- Reference -->

[article]: https://luke.sh/articles/the-paired-hook-pattern
[changelog]: https://github.com/vangware/react-pair/blob/main/CHANGELOG.md
[coverage-badge]:
	https://img.shields.io/coveralls/github/vangware/react-pair.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://coveralls.io/github/vangware/react-pair
[coverage]: https://coveralls.io/github/vangware/react-pair
[documentation]: https://react-pair.vangware.com
[esm.sh]: https://esm.sh
[license-badge]:
	https://img.shields.io/npm/l/react-pair.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/react-pair/blob/main/LICENSE
[npm-version-badge]:
	https://img.shields.io/npm/v/react-pair.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://npm.im/react-pair
[open-issues-badge]:
	https://img.shields.io/github/issues/vangware/react-pair.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/react-pair/issues
