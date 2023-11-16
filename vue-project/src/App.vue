<script>
import $ from 'jquery'
import 'jquery-mask-plugin'

export default {
  data() {
    return {
      users: [],
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      middleName: '',
      birthdate: '',
      group: 'ІА-21',
      file: '',
      gender: 'male',
      phone: '',
      selectedRows: [],
      emailError: '',
      passwordError: '',
      lastNameError: '',
      firstNameError: '',
      middleNameError: '',
      birthdateError: '',
      fileError: '',
      phoneError: ''
    }
  },
  mounted() {
    $('#phone').mask('+38(099) 999-9999')
  },

  methods: {
    registerUser() {
      if (!this.validateForm()) {
        return
      }
      const userData = {
        email: this.email,
        password: this.password,
        lastName: this.lastName,
        firstName: this.firstName,
        middleName: this.middleName,
        birthdate: this.birthdate,
        group: this.group,
        file: this.file,
        gender: this.gender,
        phone: this.phone
      }
      this.addToUserTable(userData)
      this.clearForm()
    },
    validateForm() {
      this.clearErrorMessages()
      const checkingFields = [
        { value: this.email, name: 'Email', errorProperty: 'emailError' },
        { value: this.password, name: 'Password', errorProperty: 'passwordError' },
        { value: this.lastName, name: 'Last Name', errorProperty: 'lastNameError' },
        { value: this.firstName, name: 'First Name', errorProperty: 'firstNameError' },
        { value: this.middleName, name: 'Middle Name', errorProperty: 'middleNameError' },
        { value: this.birthdate, name: 'Birthdate', errorProperty: 'birthdateError' },
        { value: this.group, name: 'Group' },
        { value: this.file, name: 'File', errorProperty: 'fileError' },
        { value: this.gender, name: 'Gender' },
        { value: this.phone, name: 'Phone', errorProperty: 'phoneError' }
      ]
      for (let field of checkingFields) {
        if (!field.value.trim()) {
          this.displayErrorMessage(field.errorProperty, `${field.name} is required`)
          return false
        }
      }
      return true
    },
    displayErrorMessage(field, message) {
      this[field] = message
    },

    clearErrorMessages() {
      const errorFields = [
        'emailError',
        'passwordError',
        'lastNameError',
        'firstNameError',
        'middleNameError',
        'birthdateError',
        'fileError',
        'phoneError'
      ]
      errorFields.forEach((field) => {
        this[field] = ''
      })
    },

    addToUserTable(userData) {
      this.users.push(userData)
    },
    clearForm() {
      this.email = ''
      this.password = ''
      this.lastName = ''
      this.firstName = ''
      this.middleName = ''
      this.birthdate = ''
      this.group = 'ІА-21'
      this.file = ''
      this.gender = 'male'
      this.phone = ''
    },
    fileChange(event) {
      const selectedFile = event.target.files[0]
      const file = selectedFile.name
      this.file = file
    },
    deleteSelected() {
      const table = document.getElementById('userTable')
      const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked')

      checkboxes.forEach(function (checkbox) {
        const row = checkbox.closest('tr')
        row.remove()
      })
    },
    duplicateSelected() {
      const table = document.getElementById('userTable')
      const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked')

      checkboxes.forEach(function (checkbox) {
        const row = checkbox.closest('tr')
        const newRow = row.cloneNode(true)
        table.querySelector('tbody').appendChild(newRow)
      })
    }
  }
}
</script>

<template>
  <header>
    <div class="logo">
      <img src="./logo.PNG" alt="logo" />
    </div>
  </header>
  <main id="sign_up">
    <div id="signCont">
      <form id="signForm">
        <h2>Реєстрація</h2>

        <div class="contact">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="Введіть Ваш Email"
            required
          /><br />
          <span class="error-message">{{ emailError }}</span>
        </div>

        <div class="contact">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            placeholder="Введіть Ваш пароль"
            required
          /><br />
          <span class="error-message">{{ passwordError }}</span>
        </div>

        <div class="contact">
          <label>Прізвище:</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            v-model="lastName"
            pattern="^[A-Za-z]+$"
            title="Введіть літери"
            placeholder="Введіть Ваше прізвище"
            required
          /><br />
          <span class="error-message">{{ lastNameError }}</span>
        </div>

        <div class="contact">
          <label>Ім'я:</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            v-model="firstName"
            pattern="^[A-Za-z]+$"
            title="Введіть літери"
            placeholder="Введіть Ваше ім'я"
            required
          /><br />
          <span class="error-message">{{ firstNameError }}</span>
        </div>

        <div class="contact">
          <label>По батькові:</label>
          <input
            type="text"
            name="middle_name"
            id="middle_name"
            v-model="middleName"
            pattern="^[A-Za-z]+$"
            title="Введіть літери"
            placeholder="Введіть Ваше по-батькові"
            required
          /><br />
          <span class="error-message">{{ middleNameError }}</span>
        </div>

        <div class="contact">
          <label>Дата народження:</label>
          <input type="date" name="birthdate" id="birthdate" v-model="birthdate" /><br />
          <span class="error-message">{{ birthdateError }}</span>
        </div>

        <div class="contact">
          <label>Група:</label>
          <select name="group" id="group" v-model="group">
            <option value="IA-21">ІА-21</option>
            <option value="IA-22">ІА-22</option>
            <option value="IA-23">ІА-23</option>
            <option value="IA-24">ІА-24</option></select
          ><br />
        </div>

        <div class="contact">
          <label>Завантажити файл:</label>
          <input
            type="file"
            name="file"
            id="file"
            @change="fileChange"
            accept=".pdf, .doc, .docx"
            required
          /><br />
          <span class="error-message">{{ fileError }}</span>
        </div>

        <div id="contactRadio">
          <label>Стать:</label>
          <input type="radio" name="gender" value="male" id="male" v-model="gender" />
          <label for="male">Чоловіча</label>
          <input type="radio" name="gender" value="female" id="female" v-model="gender" />
          <label for="female">Жіноча</label>
        </div>

        <div class="contact">
          <label>Номер телефону:</label>
          <input type="text" id="phone" v-model="phone" /><br />
          <span class="error-message">{{ phoneError }}</span>
        </div>

        <div class="contact">
          <button type="submit" id="reg-submit" @click="registerUser">Відправити</button>
        </div>
      </form>
      <div class="buttons">
        <button type="button" id="delete-selected" class="signButtons" @click="deleteSelected">
          Видалити обрані
        </button>
        <button
          type="button"
          id="duplicate-selected"
          class="signButtons"
          @click="duplicateSelected"
        >
          Дублювати обрані
        </button>
      </div>
    </div>
    <table id="userTable">
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Прізвище</th>
          <th>Ім’я</th>
          <th>По батькові</th>
          <th>Дата народження</th>
          <th>Група</th>
          <th>Файл</th>
          <th>Стать</th>
          <th>Номер телефону</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td><input type="checkbox" /></td>
          <td>{{ user.email }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.middleName }}</td>
          <td>{{ user.birthdate }}</td>
          <td>{{ user.group }}</td>
          <td>{{ user.file }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </main>
  <footer>
    <div class="login_contacts">
      <a href="tel: +380637117208" class="log_cont">
        <i class="fa fa-phone-square" aria-hidden="true"></i>
      </a>
      <a href="mailto: dennatarov0129@gmail.com" class="log_cont">
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </a>
      <a href="tg://resolve?domain=eccoor" class="log_cont">
        <i class="fa fa-telegram" aria-hidden="true"></i>
      </a>
      <a href="whatsapp://send?phone=+380637117208" class="log_cont">
        <i class="fa fa-whatsapp" aria-hidden="true"></i>
      </a>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway&family=Rubik:wght@500&display=swap');
header {
  background-color: black;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid black;
}
.logo img {
  width: 100px;
  height: auto;
}
input[type='email'],
input[type='password'],
input[type='text'],
input[type='date'],
input[type='file'],
select[name='group'] {
  border: 2px solid black;
  border-radius: 8px;
  width: 200px;
  height: 40px;
  font-family: 'Raleway', sans-serif;
  text-align: center;
}
#sign_up {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
#signCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
#signForm {
  width: 500px;
  height: auto;
  display: inline-grid;
  justify-content: center;
  margin: 0;
}
#signForm h2 {
  padding-top: 30px;
  text-align: center;
  height: 70px;
  font-family: 'Rubik', sans-serif;
}
#contactRadio {
  display: flex;
  justify-content: center;
  text-align: center;
  color: black;
  font-family: 'Rubik', sans-serif;
}
.signButtons {
  align-self: flex-end;
  margin-right: 10px;
}
button {
  border: 2px solid black;
  background-color: black;
  color: white;
  font-family: 'Raleway', sans-serif;
  border-radius: 8px;
  width: 250px;
  height: 50px;
}
.contact {
  display: inline-grid;
  justify-content: center;
  text-align: center;
  color: black;
  font-family: 'Rubik', sans-serif;
}
.buttons {
  display: flex;
  justify-content: center;
  margin: 10px;
}
#reg-submit {
  margin-top: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #000000;
  padding: 10px;
  text-align: left;
  font-family: 'Rubik', sans-serif;
}
thead {
  background-color: #000000;
}
th {
  color: #ffffff;
  text-align: center;
  font-family: 'Raleway', sans-serif;
}
footer {
  background-color: black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 3px solid black;
}
.login_contacts {
  font-size: 40px;
  padding-right: 20px;
  padding-top: 30px;
  width: 300px;
  text-align: center;
}
.log_cont {
  color: white;
  margin: 5px;
}
.error-message {
  color: red;
  font-size: 15px;
  margin-bottom: 10px;
  font-family: 'Raleway', sans-serif;
}
</style>
