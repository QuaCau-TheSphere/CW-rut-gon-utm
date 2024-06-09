import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../T%E1%BA%A1o%20b%C3%A0i%20%C4%91%C4%83ng%20v%C3%A0%20n%C6%A1i%20%C4%91%C4%83ng/Code%20h%E1%BB%97%20tr%E1%BB%A3%20cho%20server/H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20c%E1%BA%A5u%20h%C3%ACnh.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "./T%E1%BA%A1o%20slug%20n%C6%A1i%20%C4%91%C4%83ng.ts";

const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
for (const vậtThểCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
  if (vậtThểCấuHình.tênCấuHình !== "Quả Cầu") continue;
  const từĐiểnSlugNơiĐăng = tạoTừĐiểnSlugNơiĐăng(vậtThểCấuHình.cấuHình["Slug"]);
  const slug = tạoSlugNơiĐăng({
    "Tên nơi đăng": ["Quả Cầu"],
    "Loại nơi đăng": ["Tài khoản"],
    "Tên nền tảng": "Facebook",
    "Loại nền tảng": "Diễn đàn",
    URL: "https://www.facebook.com/qua.cau.the.sphere",
  }, từĐiểnSlugNơiĐăng);
  console.log(slug);
}
