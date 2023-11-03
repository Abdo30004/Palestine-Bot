class Util {
  static title(str: string) {
    if (str === null || str === "") return "";
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
  }
}

console.log(Util.generateUniqueID());
export default Util;
export { Util };
