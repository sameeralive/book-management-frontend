import { Component } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent {
  authorsList: Author[] = [];

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(
      (data) => {
        this.authorsList = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }
}
