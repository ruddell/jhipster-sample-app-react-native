export default {
  // Functions return fixtures

  // entity fixtures
  updateRegion: (region) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-region.json'),
    };
  },
  getAllRegions: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-regions.json'),
    };
  },
  getRegion: (regionId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-region.json'),
    };
  },
  deleteRegion: (regionId) => {
    return {
      ok: true,
    };
  },
  updateCountry: (country) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-country.json'),
    };
  },
  getAllCountries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-countries.json'),
    };
  },
  getCountry: (countryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-country.json'),
    };
  },
  deleteCountry: (countryId) => {
    return {
      ok: true,
    };
  },
  updateLocation: (location) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-location.json'),
    };
  },
  getAllLocations: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-locations.json'),
    };
  },
  getLocation: (locationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-location.json'),
    };
  },
  deleteLocation: (locationId) => {
    return {
      ok: true,
    };
  },
  updateDepartment: (department) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-department.json'),
    };
  },
  getAllDepartments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-departments.json'),
    };
  },
  getDepartment: (departmentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-department.json'),
    };
  },
  deleteDepartment: (departmentId) => {
    return {
      ok: true,
    };
  },
  updateTask: (task) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-task.json'),
    };
  },
  getAllTasks: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-tasks.json'),
    };
  },
  getTask: (taskId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-task.json'),
    };
  },
  deleteTask: (taskId) => {
    return {
      ok: true,
    };
  },
  updateEmployee: (employee) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-employee.json'),
    };
  },
  getAllEmployees: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-employees.json'),
    };
  },
  getEmployee: (employeeId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-employee.json'),
    };
  },
  deleteEmployee: (employeeId) => {
    return {
      ok: true,
    };
  },
  updateJob: (job) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-job.json'),
    };
  },
  getAllJobs: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-jobs.json'),
    };
  },
  getJob: (jobId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-job.json'),
    };
  },
  deleteJob: (jobId) => {
    return {
      ok: true,
    };
  },
  updateJobHistory: (jobHistory) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-job-history.json'),
    };
  },
  getAllJobHistories: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-job-histories.json'),
    };
  },
  getJobHistory: (jobHistoryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-job-history.json'),
    };
  },
  deleteJobHistory: (jobHistoryId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json')
    }
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        }
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
