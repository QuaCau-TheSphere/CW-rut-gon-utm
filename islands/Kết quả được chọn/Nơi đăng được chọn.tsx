import { NơiĐăngChưaXácĐịnhVịTrí, tạoNơiĐăngĐãXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { nơiĐăngChưaXácĐịnhVịTríĐượcChọn, nơiĐăngĐãXácĐịnhVịTríĐượcChọn, vịTríString } from "../Signals tổng.ts";
import { tạoLoạiNơiĐăngString, tạoTênNơiĐăngString, tạoVịTríString } from "../../utils/Hàm cho khung nhập.ts";
import { làCùngNơiĐăng, ThôngTinNơiĐăng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";

/** Tạo danh sách các phần tử <option> để người dùng lựa chọn vị trí đăng từ danh sách vị trí có thể đăng*/
function tạoDanhSáchLựaChọnVịTrí(nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí) {
  const danhSáchVịTríCóThểĐăng = nơiĐăng["Vị trí có thể đăng"];
  const danhSáchLựaChọn = [];

  if (danhSáchVịTríCóThểĐăng) {
    for (const vịTríCóThểĐăng of danhSáchVịTríCóThểĐăng) {
      const value = JSON.stringify(vịTríCóThểĐăng);
      const text = tạoVịTríString(vịTríCóThểĐăng);
      const i = danhSáchVịTríCóThểĐăng.indexOf(vịTríCóThểĐăng);

      if (i === 0) {
        danhSáchLựaChọn.push(<option selected value={value}>{text}</option>);
        const nơiĐăngĐượcChọnTrướcĐó = nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value as ThôngTinNơiĐăng;
        if (!làCùngNơiĐăng(nơiĐăng, nơiĐăngĐượcChọnTrướcĐó)) {
          vịTríString.value = value;
          nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value = tạoNơiĐăngĐãXácĐịnhVịTrí(value, nơiĐăng);
        }
      } else {
        danhSáchLựaChọn.push(<option value={value}>{text}</option>);
      }
    }
  } else {
    const vịTríMặcĐịnh = "Chưa cấu hình";
    vịTríString.value = vịTríMặcĐịnh;
    nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value = tạoNơiĐăngĐãXácĐịnhVịTrí(vịTríMặcĐịnh, nơiĐăng);
    danhSáchLựaChọn.push(<option selected>{vịTríMặcĐịnh}</option>);
  }

  return danhSáchLựaChọn;
}

function handleChange(vịTríStringĐượcChọn: string, nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí) {
  vịTríString.value = vịTríStringĐượcChọn;
  console.info("Vị trí được chọn:", vịTríStringĐượcChọn);
  nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value = tạoNơiĐăngĐãXácĐịnhVịTrí(vịTríStringĐượcChọn, nơiĐăng);
}

export default function NơiĐăngĐượcChọn() {
  const nơiĐăng = nơiĐăngChưaXácĐịnhVịTríĐượcChọn.value;
  if (!nơiĐăng) return <></>;
  const { "Tên nơi đăng": tênNơiĐăng, URL: url, "Đơn vị quản lý": đơnVịQuảnLý, "Lĩnh vực": lĩnhVực } = nơiĐăng;
  const danhSáchLựaChọnVịTrí = tạoDanhSáchLựaChọnVịTrí(nơiĐăng);
  const tênNơiĐăngString = tạoTênNơiĐăngString(tênNơiĐăng);
  const loạiNơiĐăngString = tạoLoạiNơiĐăngString(nơiĐăng);
  return (
    <article
      id="nơi-đăng-được-chọn"
      class="card w-full bg-base-200 shadow-xl"
    >
      <div class="card-body">
        <h2 id="tên-nơi-đăng" class="card-title">{tênNơiĐăngString}</h2>
        <ul class="font-xs text-slate-400">
          <li id="loại-nơi-đăng" class="hover:text-primary-content">Loại nơi đăng: {loạiNơiĐăngString}</li>
          <li id="url" class="hover:text-primary-content">URL: {url}</li>
          <li id="đơn-vị-quản-lý" class="hover:text-primary-content">Đơn vị quản lý: {đơnVịQuảnLý}</li>
          <li id="lĩnh-vực" class="hover:text-primary-content">Lĩnh vực: {lĩnhVực}</li>
        </ul>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text font-bold">Vị trí</span>
          </div>
          <select
            name="Vị trí"
            class="select select-bordered w-full max-w-xs prose"
            id="vị-trí"
            value={vịTríString.value}
            onChange={(e) => handleChange((e.target as HTMLSelectElement).value, nơiĐăng)}
            required
          >
            {danhSáchLựaChọnVịTrí}
          </select>
        </label>
      </div>
    </article>
  );
}
