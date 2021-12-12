import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, pipe } from 'rxjs';

import { AppComponent } from './app.component';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Should fetch all the users', () => {
    const mockUsers: User[] = [{
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    }]
    spyOn(component.dataservice, 'getUsers').and.returnValue(of(mockUsers));
    component.fetchUsers();
    expect(component.isLoaded).toBeTrue();
  });

  it('Should fetch posts by selected user', () => {
    const mockPosts: Post[] = [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et"
    }]
    spyOn(component.dataservice, 'fetchUserPost').and.returnValue(of(mockPosts));
    const mockObj = {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
    }
    component.fetchPost(mockObj);
    expect(component.isLoaded).toBeTrue();
  });

  it('Should fetch comments for the selected posts', () => {
    const mockComments: Comment[] =
      [{
        id: 2,
        postId: 1,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body: "est natus enim"
      }]
    spyOn(component.dataservice, 'fetchComments').and.returnValue(of(mockComments));
    const mockObj = {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et",
    }
    component.fetchComments(mockObj);
    expect(component.isLoaded).toBeTrue();
  });


  it('Should load all post when click on Load All button', () => {
    component.loadAllPosts();
    expect(component.loadAll).toBeTrue();
  });
});
