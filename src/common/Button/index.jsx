import styles from "./styles.module.css"

const Button = ({name, name_color, bg_color, btn_type, href}) => {
  return (
    <>
      {btn_type == "submit" ? (
        <button
         className={`${styles.commnbtn} btn`}
          type="submit"
          style={{ backgroundColor: bg_color, color: name_color }}
        >
          {name}
        </button>
      ) : (
        <a href={href}>
          <button
           className={`${styles.commnbtn} btn`}
            style={{ backgroundColor: bg_color, color: name_color }}
          >
            {name}
          </button>
        </a>
      )}
    </>
  );
};

export default Button;
