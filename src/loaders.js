import Swal from "sweetalert2"

export default function showLoader(message) {
  Swal.fire({
    title: message,
    html: `
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  })
}