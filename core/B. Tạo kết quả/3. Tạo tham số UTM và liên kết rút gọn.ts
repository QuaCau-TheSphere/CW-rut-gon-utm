import { BàiĐăng, DựÁn } from "../Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  Campaign,
  Content,
  Medium,
  Source,
  SourceDiễnĐàn,
  SourceKhác,
  SourceNềnTảngChat,
  Term,
  ThamSốUTM,
  TênNơiĐăngString,
  ĐuôiRútGọn,
} from "../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { lấyKýHiệuViếtTắt, tạoChuỗiNgẫuNhiên, tạoLiênKếtUTM } from "../Code hỗ trợ/Code hỗ trợ.ts";
import { BốiCảnh } from "../../utils/Kiểu cho web.ts";
import { LoạiNơiĐăngChat, LoạiNềnTảng, NơiĐăngĐãXácĐịnhVịTrí } from "../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { tạoVịTríString } from "../../utils/Hàm cho khung nhập.ts";
import VậtThểThamSốUTM from "../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { CấuHìnhViếtTắt } from "../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

/** Chủ yếu là thể hiện loại nền tảng, tên nền tảng, loại nơi đăng một cách ngắn gọn. Có những nơi đăng nhìn vào là biết loại nền tảng nào, ví dụ r/subreddit, hoặc email@domain.com */
function tạoSource(nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí, cấuHìnhViếtTắt: CấuHìnhViếtTắt): Source {
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Vị trí": vịTrí,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt) || tênNềnTảng;
  const tênNơiĐăngString: TênNơiĐăngString = tênNơiĐăng.join(" » ");

  let phầnNềnTảngVàNơiĐăng: string;

  switch (loạiNềnTảng) {
    case "Diễn đàn":
      phầnNềnTảngVàNơiĐăng = tạoSourceDiễnĐàn();
      break;
    case "Chat":
      phầnNềnTảngVàNơiĐăng = `${kýHiệuNềnTảng} ${tênNơiĐăngString}`;
      // phầnNềnTảngVàNơiĐăng = tạoSourceChat(loạiNơiĐăng as LoạiNơiĐăngChat);
      break;
    default:
      phầnNềnTảngVàNơiĐăng = tạoSourceKhác();
      break;
  }

  if (
    vịTrí.length > 1 &&
    vịTrí[0] !== "Bài đăng" && vịTrí[1] !== "Nội dung chính"
  ) {
    return `${phầnNềnTảngVàNơiĐăng} (${tạoVịTríString(vịTrí)})`;
  } else {
    return phầnNềnTảngVàNơiĐăng;
  }

  function tạoSourceDiễnĐàn(): SourceDiễnĐàn {
    switch (loạiNơiĐăng[0]) {
      case "Trang":
        return `${kýHiệuNềnTảng} Pg ${tênNơiĐăngString}`;
      case "Tài khoản":
        return `${kýHiệuNềnTảng} Pr ${tênNơiĐăngString}`;
      case "Nhóm":
        return `${kýHiệuNềnTảng} G ${tênNơiĐăngString}`;
      // case "Repo":
      // case "Subreddit":
      default:
        return `${kýHiệuNềnTảng} ${tênNơiĐăngString}`;
    }
  }

  function tạoSourceChat(loạiNơiĐăng: LoạiNơiĐăngChat): SourceNềnTảngChat {
    switch (loạiNơiĐăng[0]) {
      case "Cá nhân":
        return `${kýHiệuNềnTảng} I ${tênNơiĐăngString}`;
      case "Nhóm" ?? "Kênh":
        return `${kýHiệuNềnTảng} GC ${tênNơiĐăngString}`;
      case "Máy chủ":
      case "Cộng đồng":
        return `${kýHiệuNềnTảng} Sv ${tênNơiĐăngString}`;
      default:
        return `${kýHiệuNềnTảng} ${loạiNơiĐăng[0]} ${tênNơiĐăngString}`;
    }
  }

  function tạoSourceKhác(): SourceKhác {
    switch (loạiNềnTảng) {
      case "Website":
      case "Email":
        return tênNơiĐăngString;
      default:
        return `${loạiNềnTảng} ${tênNơiĐăngString}`;
    }
  }
}

function tạoMedium(loạiNềnTảng: LoạiNềnTảng): Medium {
  switch (loạiNềnTảng) {
    case "Diễn đàn":
      return "social";
    case "Chat":
      return "chat";
    case "Email":
      return "email";
    default:
      return loạiNềnTảng;
  }
}

/**
 * Tên dự án chính là tên chiến dịch
 */
function tạoCampaign(dựÁn: DựÁn | undefined = undefined): Campaign {
  if (dựÁn) {
    const { "Tên dự án": tênDựÁn, "Mã dự án": mãDựÁn } = dựÁn;
    if (mãDựÁn && tênDựÁn) {
      return `${mãDựÁn} ${tênDựÁn}`;
    } else if (!mãDựÁn && tênDựÁn) {
      return `${tênDựÁn}`;
    } else if (mãDựÁn && !tênDựÁn) {
      return `${mãDựÁn}`;
    } else {
      return undefined;
    }
  }
}

function tạoContent(bốiCảnh: BốiCảnh): Content {
  return bốiCảnh;
}

function tạoTerm(lĩnhVực: string[] | undefined): Term {
  if (!lĩnhVực) return undefined;
  return lĩnhVực.join(", ");
}

/**
 * Đuôi rút gọn theo cấu trúc sau: `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 * @param bàiĐăng Thứ tự tìm: mã bài đăng, mã dự án, viết tắt của tên dự án, ngẫu nhiên ký tự
 * @param nơiĐăng
 * @param lầnĐăng
 * @param cấuHìnhViếtTắt dùng để tìm chuỗi viết tắt
 * @returns `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 */
export function tạoĐuôiRútGọn(
  bàiĐăng: BàiĐăng,
  nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí,
  lầnĐăng: number,
  cấuHìnhViếtTắt: CấuHìnhViếtTắt,
): ĐuôiRútGọn {
  let phầnChoBàiĐăng: string | undefined;

  const { "Mã bài đăng": mãBàiĐăng, "Dự án": dựÁn, id: idBàiĐăng } = bàiĐăng;
  if (mãBàiĐăng) {
    phầnChoBàiĐăng = mãBàiĐăng;
  } else if (dựÁn) {
    const { "Mã dự án": mãDựÁn, "Tên dự án": tênDựÁn } = dựÁn;
    phầnChoBàiĐăng = mãDựÁn || lấyKýHiệuViếtTắt(tênDựÁn, cấuHìnhViếtTắt);
  }
  if (phầnChoBàiĐăng === undefined) {
    phầnChoBàiĐăng = idBàiĐăng || tạoChuỗiNgẫuNhiên(4);
  }

  const { "Mã nơi đăng": mãNơiĐăng, "Tên nơi đăng": tênNơiĐăng, id: idNơiĐăng } = nơiĐăng;
  const phầnChoNơiĐăng = mãNơiĐăng ||
    lấyKýHiệuViếtTắt(tênNơiĐăng[0], cấuHìnhViếtTắt) ||
    idNơiĐăng ||
    tạoChuỗiNgẫuNhiên(4);

  return `${phầnChoBàiĐăng}.${phầnChoNơiĐăng}.${lầnĐăng}`;
}

export default function tạoVậtThểUTM(
  { bàiĐăng, nơiĐăng, bốiCảnh, cấuHìnhViếtTắt }: {
    bàiĐăng: BàiĐăng;
    nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí;
    bốiCảnh: BốiCảnh;
    cấuHìnhViếtTắt: CấuHìnhViếtTắt;
  },
): VậtThểThamSốUTM {
  const url = bàiĐăng.URL;
  const dựÁn = bàiĐăng["Dự án"];
  const loạiNềnTảng = nơiĐăng["Loại nền tảng"];
  const lĩnhVực = nơiĐăng["Lĩnh vực"];

  const thamSốUTM: ThamSốUTM = {
    source: tạoSource(nơiĐăng, cấuHìnhViếtTắt),
    medium: tạoMedium(loạiNềnTảng),
    campaign: tạoCampaign(dựÁn),
    content: tạoContent(bốiCảnh),
    term: tạoTerm(lĩnhVực),
  };
  return {
    "Tham số UTM": thamSốUTM,
    "Liên kết UTM": tạoLiênKếtUTM(url, thamSốUTM),
  };
}
