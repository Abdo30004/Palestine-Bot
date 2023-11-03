class Util {
  static title(str: string) {
    if (str === null || str === "") return "";
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default Util;
export { Util };
