import { Handlers } from "$fresh/server.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăng } from "../../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăng,
  TênNềnTảng,
} from "../../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { viếtThường } from "../../../utils/Hàm cho khung nhập.ts";
import { assert } from "$std/assert/assert.ts";
import { FreshContext } from "https://deno.land/x/fresh@1.6.8/src/server/mod.ts";
import {
  CấuHìnhVịTrí,
  NơiĐăngChưaXácĐịnhVịTrí,
  tạoNơiĐăngChưaXácĐịnhVịTrí,
} from "../../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { parse } from "$std/yaml/mod.ts";
interface MetaTags {
  title: string;
  description: string;
  site_name: string;
  type: string;
  url: string;
  image: string;
  alt: string;
  locale: string;
}

function lấyURL(ctx: FreshContext<Record<string, unknown>, any, any>) {
  const fullUrl = ctx.url.href;
  const temp = fullUrl.split("/api/cors-proxy/");
  temp.shift();
  const url = temp.join();
  console.log("url:", url);
  return new URL(url);
}

function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

function lấyTitle(title: string): string {
  const titleSplit = title.split(" | ");
  titleSplit.pop();
  return titleSplit.join(" | ") || title;
}
async function tạoNơiĐăng(
  title: string,
  url: URL,
  description: string,
  hostname: string,
  pathname: string,
): Promise<NơiĐăngChưaXácĐịnhVịTrí> {
  let loạiNềnTảng: LoạiNềnTảng | undefined = undefined;
  let tênNềnTảng: TênNềnTảng | undefined = undefined;
  let loạiNơiĐăng: LoạiNơiĐăng | undefined = undefined;

  //deno-fmt-ignore
  const danhSáchNềnTảng = (danhSáchDiễnĐàn as unknown as TênNềnTảng[]).concat(danhSáchNềnTảngChat);
  for (const nềnTảng of danhSáchNềnTảng) {
    if (cóTênNềnTảngTrongHostname(hostname, nềnTảng)) {
      tênNềnTảng = nềnTảng;
      if ((danhSáchDiễnĐàn as unknown as TênNềnTảng[]).includes(nềnTảng)) {
        loạiNềnTảng = "Diễn đàn";
        if (hostname.includes("github")) {
          loạiNơiĐăng = ["Repo"];
        }
        if (hostname.includes("facebook") || hostname.includes("linkedin")) {
          pathname.includes("group")
            ? loạiNơiĐăng = ["Nhóm"]
            : loạiNơiĐăng = ["Trang"];
        }
        if (hostname.includes("youtube") || url.href.includes("youtu.be")) {
          if (pathname.includes("playlist")) {
            loạiNơiĐăng = ["Danh sách phát"];
          } else if (pathname.includes("/@")) {
            loạiNơiĐăng = ["Kênh"];
          } else if (pathname.includes("watch")) {
            loạiNơiĐăng = ["Video"];
          }
        }
      } else {
        loạiNềnTảng = "Chat";
        if (hostname.includes("discord")) {
          loạiNơiĐăng = ["Máy chủ", "Kênh thường"];
        }
        if (hostname.includes("telegram")) {
          loạiNơiĐăng = ["Nhóm", "Chủ đề"];
        }
      }
    }
  }
  loạiNềnTảng = loạiNềnTảng ?? "Website";
  tênNềnTảng = tênNềnTảng ?? "Website";
  loạiNơiĐăng = loạiNơiĐăng ?? ["Website"];

  const thôngTinNơiĐăng = {
    "Tên nơi đăng": [title],
    URL: url.href,
    "Mô tả nơi đăng": description,
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
  } satisfies ThôngTinNơiĐăng;
  const cấuHìnhVịTrí = parse(
    await Deno.readTextFile(
      "./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml",
    ),
  ) as CấuHìnhVịTrí;

  return tạoNơiĐăngChưaXácĐịnhVịTrí(thôngTinNơiĐăng, cấuHìnhVịTrí);
}

async function lấyMetaTag(
  url: URL,
): Promise<{ bàiĐăng: BàiĐăng; nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí }> {
  const og = (await getMetaTags(url.href)).og as MetaTags;
  assert(og);
  const title = lấyTitle(og.title);
  const description = og.description;
  const site_name = og.site_name?.replace("www.", "");

  const { hostname, pathname } = new URL(url);

  const bàiĐăng: BàiĐăng = {
    "Tiêu đề": title,
    url: url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": description,
    },
    Vault: site_name || hostname,
  };

  const nơiĐăng = await tạoNơiĐăng(title, url, description, hostname, pathname);
  return { bàiĐăng: bàiĐăng, nơiĐăng: nơiĐăng };
}
export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = lấyURL(ctx);
      const html = await (await fetch(url)).text();
      try {
        const { bàiĐăng, nơiĐăng } = await lấyMetaTag(url);

        return Response.json({
          "Nếu là bài đăng": bàiĐăng,
          "Nếu là nơi đăng": nơiĐăng,
        });
      } catch (e) {
        return Response.json({
          lỗi: String(e.stack),
          html: html,
        });
      }
    } catch {
      return Response.json({
        lỗi: `URL không hợp lệ`,
      });
    }
  },
};