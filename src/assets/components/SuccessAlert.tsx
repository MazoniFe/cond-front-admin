import { IAlert } from "./types";

// Component
const Alert = (props: IAlert) => {
  const alertStyles = {
    SUCCESS: {
      container: "border-green bg-green-light-6",
      iconBg: "bg-green",
      titleColor: "text-[#004434]",
      messageColor: "text-body-color",
    },
    WARNING: {
      container: "border-yellow bg-yellow-light-4",
      iconBg: "bg-yellow",
      titleColor: "text-[#9D5425]",
      messageColor: "text-[#D0915C]",
    },
    ERROR: {
      container: "border-red bg-red-light-6",
      iconBg: "bg-red",
      titleColor: "text-[#9D2525]",
      messageColor: "text-[#D0915C]",
    },
  };

  const { container, iconBg, titleColor, messageColor } = alertStyles[props.type];

  return (
    <div className="w-full">
      <div className="container">
        <div className={`flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9 ${container}`}>
          <div className={`mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md ${iconBg}`}>
            {/* Add SVG icon based on type */}
            {props.type === "SUCCESS" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99998 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 8.99998 0.506248ZM8.99998 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 8.99998 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 8.99998 16.2562Z" fill="white" />
                <path d="M11.4187 6.38437L8.07183 9.64687L6.55308 8.15625C6.29996 7.90312 5.90621 7.93125 5.65308 8.15625C5.39996 8.40937 5.42808 8.80312 5.65308 9.05625L7.45308 10.8C7.62183 10.9687 7.84683 11.0531 8.07183 11.0531C8.29683 11.0531 8.52183 10.9687 8.69058 10.8L12.3187 7.3125C12.5718 7.05937 12.5718 6.66562 12.3187 6.4125C12.0656 6.15937 11.6718 6.15937 11.4187 6.38437Z" fill="white" />
              </svg>
            )}
            {props.type === "WARNING" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.91875 9.00002 0.91875C8.18439 0.91875 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5813 2.98127 15.5813H15.0188C15.975 15.5813 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2188 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2188 16.1156 13.6406Z" fill="white" />
                <path d="M8.9999 6.15002C8.6624 6.15002 8.35303 6.43127 8.35303 6.79689V9.86252C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86252V6.76877C9.64678 6.43127 9.3374 6.15002 8.9999 6.15002Z" fill="white" />
                <path d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z" fill="white" />
              </svg>
            )}
            {props.type === "ERROR" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0... (error icon SVG path here)" fill="white" />
              </svg>
            )}
          </div>
          <div className="w-full">
            <h5 className={`mb-3 text-lg font-semibold ${titleColor}`}>
              {props.title}
            </h5>
            <p className={`text-base leading-relaxed ${messageColor}`}>
              {props.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
