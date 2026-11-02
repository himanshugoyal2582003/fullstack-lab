// Students ko clear dikhane ke liye ki backend API abhi connected nahi hai.
export default function ApiNotice({ children = "API abhi connect nahi hai — ye screen frontend practice ke liye hai." }) {
  return <div className="api-notice"><span className="dot" />{children}</div>;
}
