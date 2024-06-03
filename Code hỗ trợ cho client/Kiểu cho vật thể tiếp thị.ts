import ThamSốUTM, { ĐuôiRútGọn } from "./Tạo liên kết UTM/Kiểu cho tham số UTM.ts";
import { NơiĐăngCóMộtVịTríCụThể } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { DữLiệuTruyCậpCácNăm } from "./Hàm và kiểu cho biểu đồ.ts";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";

export interface VậtThểTiếpThị extends ThamSốUTM {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăngCóMộtVịTríCụThể;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}
