// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_slug_ from "./routes/[slug].ts";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_cors_proxy_url_ from "./routes/api/cors-proxy/[...url].ts";
import * as $api_newData from "./routes/api/newData.ts";
import * as $index from "./routes/index.tsx";
import * as $lmn from "./routes/lmn.ts";
import * as $lậptrình from "./routes/lậptrình.ts";
import * as $ngụngôn from "./routes/ngụngôn.ts";
import * as $KhungKếtQuảBênPhải from "./islands/KhungKếtQuảBênPhải.tsx";
import * as $KhungNhậpBênTrái from "./islands/KhungNhậpBênTrái.tsx";
import * as $Main from "./islands/Main.tsx";
import * as $Nhập_mới from "./islands/Nhập mới.tsx";
import * as $SearchDiv from "./islands/SearchDiv.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[slug].ts": $_slug_,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/cors-proxy/[...url].ts": $api_cors_proxy_url_,
    "./routes/api/newData.ts": $api_newData,
    "./routes/index.tsx": $index,
    "./routes/lmn.ts": $lmn,
    "./routes/lậptrình.ts": $lậptrình,
    "./routes/ngụngôn.ts": $ngụngôn,
  },
  islands: {
    "./islands/KhungKếtQuảBênPhải.tsx": $KhungKếtQuảBênPhải,
    "./islands/KhungNhậpBênTrái.tsx": $KhungNhậpBênTrái,
    "./islands/Main.tsx": $Main,
    "./islands/Nhập mới.tsx": $Nhập_mới,
    "./islands/SearchDiv.tsx": $SearchDiv,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
