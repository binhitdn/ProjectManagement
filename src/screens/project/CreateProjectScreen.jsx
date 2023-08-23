import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Form, ButtonComponent} from '@components/customize';
import {handleGetUsersApi} from '@api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Entypo';
import {createProject} from '@redux/slices/projectSlice';
import {COLORS} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';

const CreateProjectScreen = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [customer, setCustomer] = React.useState('');
  const [skills, setSkills] = React.useState([]);
  const [currentAssignee, setCurrentAssignee] = React.useState([]);
  const [newSkill, setNewSkill] = React.useState('');
  const [asigneesSelect, setAsigneesSelect] = React.useState([]);
  const {token} = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const {error} = useSelector(state => state.projects);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await handleGetUsersApi(token);
      setAsigneesSelect(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSkills = () => {
    setSkills([...skills, newSkill]);
    setNewSkill('');
  };
  const handleDeleteSkill = index => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleChangeText = (name, text) => {
    switch (name) {
      case 'name':
        setName(text);
        break;
      case 'description':
        setDescription(text);
        break;
      case 'customer':
        setCustomer(text);
        break;
      default:
        break;
    }
  };
  const handleCreateProject = async () => {
    if (!error) {
      let project = {
        name,
        description,
        customer,
        skills,
        assignees: currentAssignee,
      };
      dispatch(createProject(project));
      navigation.goBack();
    }
  };
  return (
    <Form.Container style={styles.container}>
      <Title title="Create Project" />
      <Input
        type="text"
        value={name}
        onChangeText={text => handleChangeText('name', text)}
        placeholder="Project Name"
        leftIcon={<Icon name="pencil" size={20} color="#900" />}
        containerStyle={styles.input}
      />

      <Input
        type="text"
        value={description}
        onChangeText={text => handleChangeText('description', text)}
        placeholder="Description"
        leftIcon={<Icon name="pencil" size={20} color="#900" />}
        containerStyle={styles.input}
      />

      <Input
        type="text"
        value={customer}
        onChangeText={text => handleChangeText('customer', text)}
        placeholder="Customer"
        leftIcon={<Icon name="user" size={20} color="#900" />}
        containerStyle={styles.input}
      />

      <Form.View
        style={{
          marginBottom: 10,
        }}>
        <Input
          type="text"
          value={newSkill}
          onChangeText={setNewSkill}
          placeholder="Skills"
          containerStyle={styles.skillsInputContainer}
          leftIcon={<Icon name="pencil" size={20} color="#900" />}
        />
        <ButtonComponent
          title="Add"
          onPress={handleChangeSkills}
          style={styles.addButton}
        />
      </Form.View>

      <View style={styles.skillsContainer}>
        {skills.map((item, index) => (
          <SkillstoEntered
            key={index}
            skills={item}
            onDelete={() => handleDeleteSkill(index)}
          />
        ))}
      </View>
      <DropDownPicker
        items={
          Array.isArray(asigneesSelect)
            ? asigneesSelect.map(item => ({
                label: item.name,
                value: item._id,
              }))
            : []
        }
        value={currentAssignee}
        setValue={(value, index) => {
          setCurrentAssignee(value);
        }}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        maxHeight={400}
        autoScroll
        placeholder="Select Assignees"
        placeholderStyle={{
          color: '#ccc',
          fontSize: 12,
          fontWeight: 'bold',
        }}
        multiple={true}
        min={0}
        max={10}
        mode="BADGE"
        badgeColors={['red', 'green', 'blue', 'black']}
        badgeTextStyle={{
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        }}
        badgeDotColors={['white']}
        style={{
          borderColor: COLORS.PRIMARY,
          borderWidth: 2,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <ButtonComponent title="Create" onPress={handleCreateProject} />
    </Form.Container>
  );
};

const Title = ({title}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const SkillstoEntered = ({skills, onDelete}) => {
  return (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{skills}</Text>
      <Icon
        name="cross"
        size={20}
        color="#900"
        style={styles.skillIcon}
        onPress={onDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  skillsInputContainer: {
    flex: 3,
  },
  addButton: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
  },
  skillText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  skillIcon: {
    marginLeft: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default CreateProjectScreen;
