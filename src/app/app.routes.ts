import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RegistroPersonasComponent } from './registro-personas/registro-personas.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ReservarSalonComponent } from './reservar-salon/reservar-salon.component';
import { NuevaCapacitacionComponent } from './nueva-capacitacion/nueva-capacitacion.component';
import { PersonasRegistradasComponent } from './personas-registradas/personas-registradas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { PermisosComponent } from './permisos/permisos.component';
import { VerEmpleadosComponent } from './ver-empleados/ver-empleados.component';
import { NivelAcademicoComponent } from './nivel-academico/nivel-academico.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'registro-personas', component: RegistroPersonasComponent },
  { path: 'crear-empleado', component: CrearEmpleadoComponent },
  { path: 'permisos', component: PermisosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'reservar-salon', component: ReservarSalonComponent },
  { path: 'nueva-capacitacion', component: NuevaCapacitacionComponent },
  { path: 'personas-registradas', component: PersonasRegistradasComponent },
  { path: 'ver-empleados', component: VerEmpleadosComponent },
  { path: 'nivel-academico', component: NivelAcademicoComponent },
  { path: 'mantenimiento', component: MantenimientoComponent },


  {
    path: 'agregar-roles',
    loadComponent: () => import('./agregar-roles/agregar-roles.component').then(m => m.AgregarRolesComponent)
  },
  { path: '**', redirectTo: 'home' }
];
