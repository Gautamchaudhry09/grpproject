import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, LB_entry } from './model/leaderBoardEntry';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tableData: LB_entry[] = [];
  masterService = inject(MasterService);
  route = inject(ActivatedRoute); 
  paramID: string | null = "New York TX";
  filteredEntry: { ranking: number; territory_id: string; total_points: number } | null = null;
  loading: boolean = true;
  

  ngOnInit(): void {
    this.loadLeaderBoard();
    this.getParams();
  }
  
  getParams(): void {
    this.route.paramMap.subscribe((params) => {
      // this.paramID = params.get('id');
    });
  }

  getOrdinalSuffix(index: number): string {
    const j = index % 10;
    const k = index % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }

  loadLeaderBoard(): void {
    this.masterService.getLeaderBoard().subscribe({
      next: (res: ApiResponseModel) => {
        this.tableData = res.LeaderBoard;
        
        if (this.paramID) {
          const filteredIndex = res.LeaderBoard.findIndex((entry: any) => entry.territory_id === this.paramID);
          if (filteredIndex !== -1) {
            const filtered = res.LeaderBoard[filteredIndex];
            this.filteredEntry = { ...filtered, ranking: filteredIndex };
          } else {
            this.filteredEntry = null;
          }
        }
      },
      error: (error) => {
        console.error('Error fetching leaderboard data:', error);
      },
      complete: () => {
        this.loading = false; // Set loading to false after data is fetched
      }
    });
  }
}
