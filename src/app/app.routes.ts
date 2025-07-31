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
import { ProfesionComponent } from './profesion/profesion.component';
import { CargoComponent } from './cargo/cargo.component';
import { DireccionComponent } from './direccion/direccion.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { SalonComponent } from './salon/salon.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { TipoReunionComponent } from './tipo-reunion/tipo-reunion.component';
import { RecursosComponent } from './recursos/recursos.component';
import { RolComponent } from './rol/rol.component';



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
  { path: 'profesion', component: ProfesionComponent },
  { path: 'cargo', component: CargoComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'departamento', component: DepartamentoComponent },
  { path: 'salon', component: SalonComponent },
  { path: 'institucion', component: InstitucionComponent },
  { path: 'tipo-reunion', component: TipoReunionComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'rol', component: RolComponent },


  {
    path: 'agregar-roles',
    loadComponent: () => import('./agregar-roles/agregar-roles.component').then(m => m.AgregarRolesComponent)
  },
  { path: '**', redirectTo: 'home' }
];
