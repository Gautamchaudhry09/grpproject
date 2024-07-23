import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, LB_entry } from '../model/leaderBoardEntry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://gcptest.testexperience.site/';
  constructor(private http: HttpClient) { }

  getLeaderBoard(): Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(this.apiUrl + 'fetchLeaderboard_testing');
  }
}
