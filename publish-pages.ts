import ghpages from "gh-pages";

ghpages.publish("dist", (...v) => console.log("finished publishing...", ...v));
