import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.querySelector('#eliminar-proyecto')

if(btnEliminar){
    btnEliminar.addEventListener('click', (e) => {
        const urlProject = e.target.dataset.projectUrl

        //console.log(urlProject)

        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, Cancel'
        }).then((result) => {
          if(result.value){
            //axios
            const url = `${location.origin}/project/${urlProject}`

            axios.delete(url, {params: {urlProject}})
                .then(function(response){
                  Swal.fire({
                      'Deleted!',
                      response.data,
                      'success'
                    })
                    //redirect user
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000);
                })
                //return
          }
        }).catch(() => {
            Swal.fire({
                type: 'error',
                title: 'Woops! Something is bad',
                text: 'Can\'t delete the work'
            })
        })
      })
}

export default btnEliminar