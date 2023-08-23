import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SearchInput from '@components/customize/Input/SearchInput';
import {fetchProjects} from '@redux/slices/projectSlice';
import Header from '@components/Header';
import Icon from 'react-native-vector-icons/AntDesign';

const ProjectManagement = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [projectsView, setProjectsView] = React.useState([]);
  const {projects, loading} = useSelector(state => state.projects);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProjects());
    setProjectsView(projects);
  }, []);

  React.useEffect(() => {
    if (search === '') {
      setProjectsView(projects);
    } else {
      const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase()),
      );
      setProjectsView(filteredProjects);
    }
  }, [search, projects]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        {user.role === 'admin' ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProject')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              gap: 10,
            }}>
            <Icon name="pluscircleo" size={30} color="#0000ff" />
            <Text
              style={{
                fontSize: 16,
                color: 'gray',
              }}>
              新規プロジェクトを作成する
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.header}>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="プロジェクトを検索"
            placeholderTextColor="gray"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={projectsView}
            renderItem={({item}) => <ProjectItem project={item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            animationEnabled={true}
          />
        )}
      </View>
    </>
  );
};

const ProjectItem = ({project}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const navigation = useNavigation();

  const getStatusColor = status => {
    switch (status) {
      case 'in_progress':
        return '#FFD700';
      case 'completed':
        return '#00FF00';
      default:
        return '#FF0000';
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Project', {id: project._id})}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.itemContainer,
        {backgroundColor: isPressed ? '#e0e0e0' : 'white'},
      ]}>
      <View style={styles.projectInfo}>
        <Text style={styles.projectTitle}>{project.name}</Text>
        <Text style={styles.projectCustomer}>顧客: {project.customer}</Text>
        <Text
          style={[
            styles.projectStatus,
            {color: getStatusColor(project.status)},
          ]}>
          ステータス : {project.status}
        </Text>
        <Text style={styles.projectSkills}>
          スキル: {project.skills.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectCustomer: {
    fontSize: 14,
    marginBottom: 4,
  },
  projectStatus: {
    fontSize: 14,
    marginBottom: 4,
  },
  projectSkills: {
    fontSize: 14,
  },
});

export default ProjectManagement;
