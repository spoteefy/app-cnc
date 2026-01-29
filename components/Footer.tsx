
import React from 'react';
import { IMAGES } from '../constants';

const Footer: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => {
  return (
    <footer 
      className={`w-full py-12 flex flex-col items-center text-center space-y-6 max-w-sm mx-auto ${className}`}
      style={style}
    >
      {/* Hiển thị logo trực tiếp trên nền đỏ đô với kích thước nhỏ hơn */}
      <div className="transition-transform active:scale-70 px-4 flex items-center justify-center">
        <img 
          src={IMAGES.mobiFoneLogo} 
          alt="MobiFone High-Tech Logo" 
          className="h-10 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" 
          onLoad={() => console.log("Logo loaded:", IMAGES.mobiFoneLogo)}
          onError={(e) => {
            const target = e.currentTarget;
            console.error("Logo HT load error, target source:", target.src);
            // Nếu lỗi, thử truy cập trực tiếp bằng đường dẫn tuyệt đối từ root
            if (target.src.indexOf('/Asset') === -1) {
              target.src = "/Asset%2058@4x.png";
            } else {
              target.style.display = 'none';
            }
          }}
        />
      </div>
      
      <div className="space-y-3 px-4">
        <h4 className="text-[10px] font-black tracking-tighter text-primary uppercase leading-tight">
          TRUNG TÂM CÔNG NGHỆ CAO MOBIFONE - CHI NHÁNH TỔNG CÔNG TY VIỄN THÔNG MOBIFONE
        </h4>
        <div className="h-px w-10 bg-primary/30 mx-auto"></div>
        <div className="text-[10px] text-white/70 font-medium leading-relaxed">
          <p>Địa chỉ: Số 6 Phúc Lý, Phường Tây Tựu, Thành phố Hà Nội</p>
          <p>Website: <a href="https://www.mobifone.vn" target="_blank" rel="noopener noreferrer" className="text-primary font-bold decoration-dotted underline-offset-4 underline">https://mobifone.vn</a></p>
        </div>
      </div>
      
      <p className="text-[9px] text-white/30 leading-relaxed pt-5 border-t border-white/5 px-8 italic font-light">
        Nguyên mẫu được thực hiện bởi Nhóm Nghiên cứu, phát triển và ứng dụng Trí tuệ nhân tạo - Phòng Đổi mới sáng tạo, Trung tâm Công nghệ cao MobiFone
      </p>
    </footer>
  );
};

export default Footer;