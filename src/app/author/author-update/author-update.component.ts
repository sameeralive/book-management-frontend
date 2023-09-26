import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../models/author';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.scss'],
})
export class AuthorUpdateComponent implements OnInit {
  author: Author = new Author();
  isLoading: boolean = false;
  authorId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getAuthorData();
  }

  getAuthorData() {
    this.authorId = this.route.snapshot.params['id'];
    this.authorService.getAuthor(this.authorId).subscribe(
      (data) => {
        this.author = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }

  onSubmit() {
    this.isLoading = true;
    // @ts-ignore
    delete this.author._id;
    this.authorService.updateAuthor(this.authorId, this.author).subscribe(
      (data: any) => {
        this.toastr.success('Updated successfully', 'Success');
        this.isLoading = false;
        this.router.navigateByUrl('/author/author-list');
      },
      (err: any) => {
        console.log(err);
        this.toastr.error('Something went wrong', 'Error');
        this.isLoading = false;
      },
    );
  }
}
