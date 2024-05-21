import { parse } from "$std/yaml/mod.ts";
import { CấuHìnhChung, CấuHìnhViếtTắt, NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/env.ts";
import Main from "../islands/Main.tsx";

export default async function App() {
  const kv = await Deno.openKv();

  const danhSáchEntryBàiĐăngTrênKv = await Array.fromAsync(kv.list({ prefix: ["Bài đăng"] })) as Deno.KvEntry<BàiĐăng>[];
  const danhSáchBàiĐăng = danhSáchEntryBàiĐăngTrênKv.map((entry) => entry.value);

  const danhSáchEntryNơiĐăngTrênKv = await Array.fromAsync(kv.list({ prefix: ["Nơi đăng"] })) as Deno.KvEntry<NơiĐăngChưaXácĐịnhVịTrí>[];
  const danhSáchNơiĐăng = danhSáchEntryNơiĐăngTrênKv.map((entry) => entry.value);

  const cấuHìnhChung = parse(await Deno.readTextFile(ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG)) as CấuHìnhChung;
  const cấuHìnhViếtTắt = cấuHìnhChung["Viết tắt"];

  const textTrangChủ = await Deno.readTextFile("docs/Trang chủ.md");

  return (
    <body class="">
      <Main
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhViếtTắt={cấuHìnhViếtTắt}
        textTrangChủ={textTrangChủ}
      />
    </body>
  );
}
