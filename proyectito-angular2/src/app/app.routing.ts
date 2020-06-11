//Importamos el router
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos los componentes
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

//Definimos cada una de las rutas
const appRoutes: Routes = [
    {path: '',component: AboutComponent}, // pagina que se carga por defecto y su componente
    {path: 'sobre-mi', component:AboutComponent},
    {path: 'proyectos', component:ProjectsComponent},
    {path: 'crear-proyecto', component:CreateComponent},
    {path: 'contacto', component:ContactComponent},
    {path: '**', component:ErrorComponent}, // ruta 404, cuando la ruta sea incorrecta o se produzca algun error
];

//exportamos la configuracion de las rutas
export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

