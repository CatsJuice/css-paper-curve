export const Content = () => {
  return (
    <article>
      <h1>🤗 Effects</h1>
      <p>
        Effects are an
        <a href="https://react.dev/learn/escape-hatches" target="_blank">
          “escape hatch”
        </a>
        : you use them when you need to “step outside React” and when there is
        no better built-in solution for your use case. If you find yourself
        often needing to manually write Effects, it’s usually a sign that you
        need to extract some
        <a
          href="https://react.dev/learn/reusing-logic-with-custom-hooks"
          target="_blank"
        >
          custom Hooks
        </a>
        for common behaviors your components rely on.
      </p>
      <p>
        For example, this
        <code>useChatRoom</code> custom Hook “hides” the logic of your Effect
        behind a more declarative API
      </p>
    </article>
  );
};