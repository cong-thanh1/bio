import { useEffect, useState } from 'react';

type GearItem = { name: string; kind: string; image?: string };

const gear: GearItem[] = [
  { name: 'WLmouse HUAN', kind: 'Chuột gaming', image: '/setup/wlmouse-huan-cutout.png' },
  { name: 'Razer Viper V3 Pro', kind: 'Chuột gaming', image: '/setup/razer-viper-v3-pro-cutout.png' },
  { name: 'Scyrox V6', kind: 'Chuột gaming', image: '/setup/scyrox-v6-40g-lightweight-wireless-gaming-mouse-cover_1600x_12f2919c-fe3c-48f9-a0fb-ea27d43c5cd8-removebg-preview.png' },
  { name: 'Aula S75 Pro', kind: 'Bàn phím cơ', image: '/setup/647384087-removebg-preview.png' },
];

function GearPlaceholder({ small = false, image }: { small?: boolean; image?: string }) {
  return <span className={`gear-placeholder${small ? ' small' : ''}${image ? ' has-image' : ''}`} aria-hidden="true">
    {image ? <img src={image} alt="" /> : <svg viewBox="0 0 100 100"><rect x="15" y="21" width="70" height="58" rx="15" /><circle cx="38" cy="49" r="5" /><circle cx="62" cy="49" r="5" /><path d="M34 65h32M50 57v16" /></svg>}
  </span>;
}

export default function MySetup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState<GearItem | null>(null);
  const activeGear = gear[activeIndex];
  const previousIndex = (activeIndex - 1 + gear.length) % gear.length;
  const nextIndex = (activeIndex + 1) % gear.length;

  useEffect(() => {
    if (detail) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % gear.length), 5000);
    return () => window.clearInterval(timer);
  }, [detail]);

  useEffect(() => {
    if (!detail) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDetail(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [detail]);

  const move = (amount: number) => setActiveIndex((index) => (index + amount + gear.length) % gear.length);

  return <section className="my-setup-section" id="gear-setup" aria-labelledby="my-setup-title">
    <div className="section-heading"><span className="section-icon" aria-hidden="true">✦</span><h2 id="my-setup-title">MY SETUP</h2><span className="heading-rule" /></div>
    <p className="setup-intro">Gear mình đang sử dụng</p>
    <div className="setup-carousel-panel">
      <div className="setup-stage">
        <button className="setup-arrow" type="button" onClick={() => move(-1)} aria-label="Sản phẩm trước">‹</button>
        <button key={gear[previousIndex].name} className="gear-side" type="button" onClick={() => move(-1)} aria-label={`Chọn ${gear[previousIndex].name}`}>
          <GearPlaceholder small image={gear[previousIndex].image} />
        </button>
        <button key={activeGear.name} className={`gear-feature${activeGear.name === 'Razer Viper V3 Pro' ? ' gear-feature-viper' : ''}`} type="button" onClick={() => setDetail(activeGear)} aria-label={`Xem chi tiết ${activeGear.name}`}>
          <GearPlaceholder image={activeGear.image} />
          {!activeGear.image && <span className="gear-image-note">ẢNH SẢN PHẨM SẼ ĐƯỢC THÊM SAU</span>}
        </button>
        <button key={gear[nextIndex].name} className="gear-side" type="button" onClick={() => move(1)} aria-label={`Chọn ${gear[nextIndex].name}`}>
          <GearPlaceholder small image={gear[nextIndex].image} />
        </button>
        <button className="setup-arrow" type="button" onClick={() => move(1)} aria-label="Sản phẩm tiếp theo">›</button>
      </div>
      <div className="gear-caption" aria-live="polite">
        <small>{activeGear.kind}</small>
        <strong key={activeGear.name}>{activeGear.name}</strong>
        <span>Nhấn vào sản phẩm ở giữa để xem chi tiết</span>
      </div>
      <div className="setup-dots" aria-label="Chọn sản phẩm">
        {gear.map((item, index) => <button key={item.name} type="button" className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Hiện ${item.name}`} aria-current={index === activeIndex ? 'true' : undefined} />)}
      </div>
    </div>
    <p className="setup-note">Hình ảnh và thông tin chi tiết sẽ được cập nhật sau.</p>

    {detail && <div className="gear-detail-backdrop" role="presentation" onClick={() => setDetail(null)}>
      <section className="gear-detail" role="dialog" aria-modal="true" aria-label={`Thông tin ${detail.name}`} onClick={(event) => event.stopPropagation()}>
        <button className="gear-detail-close" type="button" onClick={() => setDetail(null)} aria-label="Đóng">×</button>
        <div className="gear-detail-image"><GearPlaceholder image={detail.image} />{!detail.image && <span>ẢNH SẢN PHẨM SẼ ĐƯỢC THÊM SAU</span>}</div>
        <small>{detail.kind}</small>
        <h3>{detail.name}</h3>
        <p>Thông tin chi tiết về sản phẩm sẽ được bổ sung sau.</p>
      </section>
    </div>}
  </section>;
}






