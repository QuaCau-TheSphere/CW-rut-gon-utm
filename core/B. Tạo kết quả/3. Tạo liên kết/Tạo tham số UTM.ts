import { BàiĐăng, DựÁn } from "../../Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
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
} from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { lấyKýHiệuViếtTắt, tạoLiênKếtUTM } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { BốiCảnh } from "../../../utils/Kiểu cho web.ts";
import { LoạiNơiĐăngChat, LoạiNềnTảng, NơiĐăngĐãXácĐịnhVịTrí } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import VậtThểThamSốUTM from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { CấuHìnhViếtTắt } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

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

  const làVịTríĐăngTầmThường = vịTrí[1] && (vịTrí[1] === "Nội dung chính" || vịTrí[1].includes("Mô tả"));
  if (vịTrí[0] === "Chưa cấu hình" || làVịTríĐăngTầmThường) {
    return phầnNềnTảngVàNơiĐăng;
  }
  return `${phầnNềnTảngVàNơiĐăng} (${vịTrí.join(": ")})`;

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

  // function tạoSourceChat(loạiNơiĐăng: LoạiNơiĐăngChat): SourceNềnTảngChat {
  //   switch (loạiNơiĐăng[0]) {
  //     case "Cá nhân":
  //       return `${kýHiệuNềnTảng} I ${tênNơiĐăngString}`;
  //     case "Nhóm" ?? "Kênh":
  //       return `${kýHiệuNềnTảng} GC ${tênNơiĐăngString}`;
  //     case "Máy chủ":
  //     case "Cộng đồng":
  //       return `${kýHiệuNềnTảng} Sv ${tênNơiĐăngString}`;
  //     default:
  //       return `${kýHiệuNềnTảng} ${loạiNơiĐăng[0]} ${tênNơiĐăngString}`;
  //   }
  // }

  function tạoSourceKhác(): SourceKhác {
    switch (loạiNềnTảng) {
      case "Website":
        return tênNơiĐăngString.replace("https://www.", "").replace("https://", "");
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
