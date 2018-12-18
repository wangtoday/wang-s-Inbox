import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.css']
})
export class ForgetpwdComponent implements OnInit {
  email: string = '';

  isVisible = false;
  isOkLoading = false;

  showError = false;
  errorMessage = '';

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.router.navigateByUrl('/auth');
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  resetPassword() {
    if (this.email.length) {
      this.authService.resetPassword(this.email).then(value => {
        console.log('send', value);
        // TODO: 未来可以filter这个error来判断究竟需要怎么处理
        if (value) {
          this.showModal();
        } else {
          this.displayErrorPanel('系统错误,请联系管理员!');
        }
      });
    } else {
      this.displayErrorPanel('请输入正确的邮箱地址!');
    }
  }

  displayErrorPanel(message) {
    this.errorMessage = message;
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 1200);
  }
}
