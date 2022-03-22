<img alt="Vangware's React Pair" src="./logo.svg" height="192" />

![Build Status][build-status-badge]
![Coverage][coverage-badge]
![License][license-badge]
![NPM Version][npm-version-badge]
![Open Issues][open-issues-badge]

🖇️ Util to help with the paired hook pattern.

## Usage

### Inline using current value of array for key and internal values

```tsx
import { pair } from "react-pair";

const pairedCount = pair(useCount);

const Component = (array: number[]) => (
	<ul>
		{array.map(key =>
			pairedCount(usePairedCount => {
				const props = usePairedCount(key);

				return (
					<li>
						<button
							type="button"
							{...props}
						/>
					</li>
				);
			})(key),
		)}
	</ul>
);
```

### Inline without key but using current value for internal values

```tsx
import { pair } from "react-pair";

const pairedCount = pair(useCount);

const Component = (array: number[]) => (
	<ul>
		{array.map(key => (
			<li key={key}>
				{pairedCount(usePairedCount => {
					const props = usePairedCount(key);

					return (
						<button
							type="button"
							{...props}
						/>
					);
				})()}
			</li>
		))}
	</ul>
);
```

### Not inline, and no key, with later execution

```tsx
import { pair } from "react-pair";

const pairedCount = pair(useCount);

const pairedCountRender = pairedCount(usePairedCount => {
	const props = usePairedCount(0);

	return (
		<button
			type="button"
			{...props}
		/>
	);
});

const Component = (array: number[]) => (
	<ul>
		{array.map(key => (
			<li key={key}>{pairedCountRender()}</li>
		))}
	</ul>
);
```

### Not inline, with key and later execution.

```tsx
import { pair } from "react-pair";

const pairedCountRender = pairedCount(usePairedCount => {
	const props = usePairedCount(0);

	return (
		<li>
			<button
				type="button"
				{...props}
			/>
		</li>
	);
});

const Component = (array: number[]) => <ul>{array.map(pairedCountRender)}</ul>;
```

## Documentation

Documentation can be found [HERE][documentation]. It is auto-generated with [typedoc][typedoc] based on the JSDocs and the types in the source. Shouldn't be necessary to read this, code editors like [VSCode][vscode] integrate the documentation in the UI.

## Changelog

Changelog can be found [HERE][changelog].

<!-- Reference -->

[build-status-badge]: https://img.shields.io/github/workflow/status/vangware/react-pair/Test.svg?style=for-the-badge&labelColor=666&color=2b7&link=https://github.com/vangware/react-pair/actions
[changelog]: https://github.com/vangware/react-pair/blob/main/CHANGELOG.md
[coverage-badge]: https://img.shields.io/coveralls/github/vangware/react-pair.svg?style=for-the-badge&labelColor=666&color=2b7&link=https://coveralls.io/github/vangware/react-pair
[documentation]: https://react-pair.vangware.com
[license-badge]: https://img.shields.io/npm/l/react-pair.svg?style=for-the-badge&labelColor=666&color=2b7&link=https://github.com/vangware/react-pair/blob/main/LICENSE
[npm-version-badge]: https://img.shields.io/npm/v/react-pair.svg?style=for-the-badge&labelColor=666&color=2b7&link=https://npm.im/react-pair
[open-issues-badge]: https://img.shields.io/github/issues/vangware/react-pair.svg?style=for-the-badge&labelColor=666&color=2b7&link=https://github.com/vangware/react-pair/issues
[typedoc]: https://typedoc.org/
[vangware]: https://vangware.com
[vscode]: https://code.visualstudio.com/
