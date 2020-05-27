This is where the actual **post** is written.

Random code:

```js
export const getStaticPaths: GetStaticPaths = async () => {
  const files = await getAllPostFiles();

  const paths = files.map((file: string): any  => ({
    params: { slug: convertFolderNameToSlugParts(file) }
  }));

  return {
    paths,
    fallback: true
  };
};
```
