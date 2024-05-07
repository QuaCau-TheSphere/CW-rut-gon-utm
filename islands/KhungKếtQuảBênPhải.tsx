import { useEffect, useState } from "preact/hooks";
import tạoThamSốUTMVàLiênKếtRútGọn from "../core/B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { BốiCảnh, VậtThểTiếpThị } from "../utils/Kiểu cho web.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăngĐãXácĐịnhVịTrí,
} from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { Signal } from "@preact/signals";
import KếtQuảĐượcChọn from "../components/Kết quả được chọn.tsx";

export default function KhungKếtQuảBênPhải(
  {
    bàiĐăngĐượcChọn,
    nơiĐăngĐượcChọn,
    bốiCảnh,
    cấuHìnhNơiĐăng,
    count,
  }: {
    bàiĐăngĐượcChọn: BàiĐăng;
    nơiĐăngĐượcChọn: NơiĐăngĐãXácĐịnhVịTrí;
    bốiCảnh: BốiCảnh;
    cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
    count: Signal<number>;
  },
) {
  const [thamSốUTMVàLiênKếtRútGọn, setThamSốUTMVàLiênKếtRútGọn] = useState<
    ThamSốUTMVàLiênKếtRútGọn | undefined
  >(undefined);
  useEffect(() => {
    const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
      {
        bàiĐăng: bàiĐăngĐượcChọn,
        nơiĐăng: nơiĐăngĐượcChọn,
        bốiCảnh: bốiCảnh,
        lầnĐăng: 1,
        cấuHìnhNơiĐăng: cấuHìnhNơiĐăng,
      },
    );
    const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
    const originWeb = globalThis.location.origin;
    const liênKếtRútGọn = `${originWeb}/${đuôiRútGọn}`;
    const thờiĐiểmTạo = new Date();
    const vậtThểTiếpThị: VậtThểTiếpThị = {
      ...{
        "Bài đăng": bàiĐăngĐượcChọn,
        "Nơi đăng": nơiĐăngĐượcChọn,
        "Thời điểm tạo": thờiĐiểmTạo,
        "Các lần truy cập": {},
      },
      ...thamSốUTMVàLiênKếtRútGọn,
    };

    async function ghiLênKV() {
      const res = await fetch(liênKếtRútGọn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vậtThểTiếpThị),
      });
      console.log("Response:", res);
    }
    ghiLênKV().catch(console.error);
    if (globalThis.location.hostname !== "localhost") {
      navigator.clipboard.writeText(liênKếtRútGọn);
    }
    setThamSốUTMVàLiênKếtRútGọn(thamSốUTMVàLiênKếtRútGọn);
    console.info("Tham số UTM và liên kết rút gọn:", thamSốUTMVàLiênKếtRútGọn);
  }, [count.value]);

  if (thamSốUTMVàLiênKếtRútGọn === undefined) return <></>;
  const originWeb = globalThis.location.origin;
  const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  const liênKếtRútGọn = `${originWeb}/${đuôiRútGọn}`;
  const liênKếtRútGọnChart = `${originWeb}/${đuôiRútGọn}/chart`;

  console.info("Bài đăng được chọn:", bàiĐăngĐượcChọn);
  console.info("Nơi đăng được chọn:", nơiĐăngĐượcChọn);

  const thamSốUTM = thamSốUTMVàLiênKếtRútGọn["Tham số UTM"];
  return (
    <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
      {tạoKếtQuảSaoChép()}
      Nội dung trên đã được sao chép sẵn vào bộ nhớ. Truy cập{" "}
      <a href={liênKếtRútGọnChart}>{liênKếtRútGọnChart}</a>{" "}
      để xem thống kê lượt truy cập.
      <details>
        <summary>Tham số UTM</summary>
        <KếtQuảĐượcChọn vậtThể={thamSốUTM} />
      </details>
    </article>
  );

  function tạoKếtQuảSaoChép() {
    console.log(bàiĐăngĐượcChọn);
    const tiêuĐề = bàiĐăngĐượcChọn["Tiêu đề"];
    if (!bàiĐăngĐượcChọn["Nội dung bài đăng"]) {
      return (
        <p id="nội-dung-tạo-sẵn">
          Không tìm thấy nội dung hoặc mô tả ngắn ở bài đăng. Liên kết rút gọn:
          {" "}
          <pre>{liênKếtRútGọn}</pre>
        </p>
      );
    }
    let nộiDungTạoSẵn = liênKếtRútGọn;
    const {
      "Mô tả bài đăng": môTả,
      "Toàn bộ nội dung": nộiDung,
    } = bàiĐăngĐượcChọn["Nội dung bài đăng"];

    if (tiêuĐề && môTả) {
      nộiDungTạoSẵn =
        `Theo như bài "${tiêuĐề}", thì ${môTả}. Link: ${liênKếtRútGọn}`;
    } else if (tiêuĐề && nộiDung) {
      nộiDungTạoSẵn = `Về vấn đề này thì mình nghĩ ${tiêuĐề}. ${nộiDung}
Nếu sau này mình nghĩ ra được thêm điều gì mới thì sẽ cập nhật ghi chú tại ${liênKếtRútGọn}`;
    } else {
      nộiDungTạoSẵn = `${tiêuĐề}: ${liênKếtRútGọn}`;
    }
    return (
      <p id="nội-dung-tạo-sẵn">
        Nội dung được tạo sẵn:
        <pre>{nộiDungTạoSẵn}</pre>
      </p>
    );
  }
}
