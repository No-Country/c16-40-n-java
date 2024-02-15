import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    //private usuarioService: UsuarioService, 
    private router: Router) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      idRol: [2, [Validators.required]]
    });
  }

  // registrarUsuario():number{
  //   const nuevoUsuario: Usuario = this.registroForm?.value;
  //   let idUsuarioCreado: number=0;
  //   nuevoUsuario.idNivelLector=1;
  //   console.log(nuevoUsuario);
  //   this.usuarioService.registrarUsuario(nuevoUsuario).subscribe({
  //     next: (data) => {
  //       idUsuarioCreado = data.idUsuario;  
  //       alert('Usuario registrado correctamente')     
  //     },
  //     error: (error) => {
  //       alert('No se pudo registrar el usuario, ' + error)
  //     }
  //   });
  //   this.router.navigate(["lista-usuarios"]);
  //   return idUsuarioCreado;   
  // }
}
