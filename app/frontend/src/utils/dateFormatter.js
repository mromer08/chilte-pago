export const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Formatea la fecha en la zona horaria de America/Guatemala
    return new Intl.DateTimeFormat("es-GT", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Guatemala",
    }).format(date);
  };