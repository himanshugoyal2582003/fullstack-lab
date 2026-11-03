export default function ApiNotice({ children = "API integration ready hai — backend URL ko .env se configure karo." }) {
  return <div className="api-notice"><span className="dot" />{children}</div>;
}
