import React from "react";
import Link from "umi/link";

export default () => <div>
  index content ...
  <br/>
  <Link to="/layout2/demo" > demo </Link>
  <br/>
  <Link to="/layout2/demo/123" > demo/123 </Link>
  <br/>
  <Link to="/fakelogin" > fakelogin </Link>
</div>