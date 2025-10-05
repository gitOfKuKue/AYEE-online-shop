const useGenerateProductId = (type, name, time, category = "") => {
  const timeCode = Date.now(time).toString().slice(-4);
  const nameCode = name.charCodeAt(0) + "-" + name.charCodeAt(name.length - 1);

  if (type === "user") {
  }

  if (type === "product") {
    const categoryCode = category.charCodeAt(0) + "-" + category.length;
    return timeCode + ":" + nameCode + ":" + categoryCode;
  }
};

module.exports = useGenerateProductId;
