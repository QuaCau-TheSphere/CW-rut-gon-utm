import { parse } from "$std/csv/mod.ts";
import { TẬP_TIN_CSV } from "../../../ĐƯỜNG_DẪN.ts";
import { BàiĐăng, TênDựÁn } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";

type TậpTinCSV = {
  post_title: string;
  guid: string;
  categories: string;
}[];

export default async function tạoDanhSáchBàiĐăngTrênWordPress() {
  const tậpTinCSV = parse(await Deno.readTextFile(TẬP_TIN_CSV), { skipFirstRow: true, strip: true }) as TậpTinCSV;
  const danhSáchBàiĐăng: Omit<BàiĐăng, "id">[] = [];
  for (const dòng of tậpTinCSV) {
    const tiêuĐề = dòng.post_title;
    const url = dòng.guid;
    const tênDựÁn: TênDựÁn = dòng.categories;

    danhSáchBàiĐăng.push({
      "Tiêu đề": tiêuĐề,
      "URL": url,
      "Dự án": {
        "Tên dự án": tênDựÁn,
        "Mã dự án": "", //todo
      },
      "Kho thông tin": new URL(url).hostname,
      "Phương thức tạo": "Nhập từ CSV",
    });
  }
  return danhSáchBàiĐăng;
}
// console.log("🚀 ~ tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) :", tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) )
