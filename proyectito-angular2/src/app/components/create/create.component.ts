import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { TranslationWidth } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title:string;
  public project:Project;
  public status:string;
  
  constructor( 
    private _projectService:ProjectService

  ){
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2020,'','');
  }

  ngOnInit(): void {
  }
  
  onSubmit(form){
    
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if (response.project){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
