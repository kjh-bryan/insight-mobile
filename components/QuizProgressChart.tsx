import { Dimensions, StyleSheet } from 'react-native';
import { SIZES } from '../constants/Theme';
import { QuizSubjectType, QuizType } from '../constants/Data';
import { Text, View } from './Themed';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../constants/Colors';

type QuizProgressChartProp = {
  quizzes: QuizType[];
};
interface MonthlyScore {
  month: string;
  maxScore: number;
}
const screenWidth = Dimensions.get('window').width - SIZES.padding * 8;
export function QuizProgressChart({ quizzes }: QuizProgressChartProp) {
  const getMonthFromDate = (date: string): string => {
    const month = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
    });
    return month;
  };
  const getMonthlyScores = (quiz: any): MonthlyScore[] => {
    const monthlyScores: MonthlyScore[] = [];

    quiz.attempts.forEach((attempt: any) => {
      const month = getMonthFromDate(attempt.created_at);
      const existingScore = monthlyScores.find(
        (score) => score.month === month
      );
      if (!existingScore) {
        monthlyScores.push({
          month,
          maxScore: attempt.quiz_score,
        });
      } else {
        existingScore.maxScore = Math.max(
          existingScore.maxScore,
          attempt.quiz_score
        );
      }
    });

    return monthlyScores;
  };

  const getLastSixMonths = (): string[] => {
    const months: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 6; i++) {
      months.unshift(getMonthFromDate(currentDate.toISOString()));
      currentDate.setMonth(currentDate.getMonth() - 1);
    }

    return months;
  };

  const generateChartData = (monthlyScores: MonthlyScore[]): any => {
    const lastSixMonths = getLastSixMonths();
    const labels = lastSixMonths;
    const datasets = [
      {
        data: lastSixMonths.map((month) => {
          const score = monthlyScores.find((s) => s.month === month);
          return score ? score.maxScore : 0;
        }),
      },
    ];

    return { labels, datasets };
  };
  const chartConfig = {
    backgroundColor: Colors.default.primary,
    backgroundGradientFrom: '#093D65',
    backgroundGradientTo: '#14699E',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
    },
  };

  return (
    <View style={styles.container}>
      {quizzes &&
        quizzes.map((quiz: QuizType) => {
          if (quiz.quiz_score == -1) return;

          const dateSet = new Set([
            quiz.attempts?.map((item: any) => {
              return item.created_at.split('T')[0];
            }),
          ]);

          const monthlyScores = getMonthlyScores(quiz);
          const chartData = generateChartData(monthlyScores);

          return (
            <View key={quiz.quiz_id}>
              <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
              />
              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  paddingBottom: 20,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    borderBottomColor: Colors.default.primary,
                    borderBottomWidth: 1,
                  }}
                >
                  {quiz.quiz_title}
                </Text>
              </View>
            </View>
          );
        })}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
