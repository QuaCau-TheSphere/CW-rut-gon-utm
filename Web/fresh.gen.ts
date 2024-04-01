// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $C_3_slug_ from "./routes/C/3[slug].ts";
import * as $_slug_ from "./routes/[slug].tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $kv_path_ from "./routes/kv/[...path].ts";
import * as $lmn from "./routes/lmn.ts";
import * as $lậptrình from "./routes/lậptrình.ts";
import * as $ngụngôn from "./routes/ngụngôn.ts";
import * as $KhungKiếmBênTrái from "./islands/KhungKiếmBênTrái.tsx";
import * as $KhungKếtQuảBênPhải from "./islands/KhungKếtQuảBênPhải.tsx";
import * as $Main from "./islands/Main.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/C/3[slug].ts": $C_3_slug_,
    "./routes/[slug].tsx": $_slug_,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/kv/[...path].ts": $kv_path_,
    "./routes/lmn.ts": $lmn,
    "./routes/lậptrình.ts": $lậptrình,
    "./routes/ngụngôn.ts": $ngụngôn,
  },
  islands: {
    "./islands/KhungKiếmBênTrái.tsx": $KhungKiếmBênTrái,
    "./islands/KhungKếtQuảBênPhải.tsx": $KhungKếtQuảBênPhải,
    "./islands/Main.tsx": $Main,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
