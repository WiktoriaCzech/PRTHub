import { useEffect, useState } from "react";

function GenerateFooter({ data }) {
  const [htmlresponse, setHTMLresponse] = useState({ __html: "" });

  console.log(JSON.stringify(data));

  useEffect(() => {
    async function createMarkup() {
      let res;
      res = await fetch("http://patkepa.pythonanywhere.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin":
            "http://patkepa.pythonanywhere.com/submit",
          // "Authorization" : `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(data),
      });
      const backendHtmlString = await res.text();
      console.log(backendHtmlString);
      return { __html: backendHtmlString };
    }
    createMarkup().then((result) => setHTMLresponse(result));
  }, [data]);

  return <div dangerouslySetInnerHTML={htmlresponse} />;
}
export default GenerateFooter;
