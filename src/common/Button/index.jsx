import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";
import Image from "next/image";

const Button = ({
  name,
  img,
  name_color,
  icon_color,
  icon,
  bg_color,
  btn_type,
  href,
  onClick
}) => {
  return (
    <>
      {btn_type === "submit" ? (

        <button
          className={`${styles.commnbtn} btn d-flex align-items-center gap-2 justify-content-center `}
          type="submit"
          style={{ backgroundColor: bg_color, color: name_color }}
          onClick={onClick}
        >
          {img ? (
            <Image
              src={img}
              className={styles.btnimg}
              alt="img-icon"
              width={20}
              height={20}
            />
          ) : (
            <DynamicIcon name={icon} color={icon_color} size={20} />
          )}
          <h6 className="m-0"> {name}</h6>
        </button>

      ) : btn_type === "link" ? (
        <a href={href} >
          <button
            className={`${styles.commnbtn} btn d-flex align-items-center gap-2 justify-content-center`}
            style={{ backgroundColor: bg_color, color: name_color }}
          >
            {img ? (
              <Image
                src={img}
                className={styles.btnimg}
                alt="img-icon"
                width={20}
                height={20}
              />
            ) : (
              <DynamicIcon name={icon} color={icon_color} size={20} />
            )}
            <h6 className="m-0">{name}</h6>
          </button>
        </a>
      ) : (
        <button
          onClick={onClick}
          className={`${styles.commnbtn} btn d-flex align-items-center gap-2 justify-content-center `}
          type="button"
          style={{ backgroundColor: bg_color, color: name_color }}
        >
          {img ? (
            <Image
              src={img}
              className={styles.btnimg}
              alt="img-icon"
              width={20}
              height={20}
            />
          ) : (
            <DynamicIcon name={icon} color={icon_color} size={20} />
          )}
          <h6 className="m-0"> {name}</h6>
        </button>
      )}
    </>
  );
};

export default Button;
